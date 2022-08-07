import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Input, List, ListItem, SimpleGrid, Spinner, Stack, Text} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import { imageHost, getTitles, searchTitles } from '../services/anilibria'
import {useRouter} from "next/router";


export default function Home() {
  let [isLoading, setIsLoading] = useState(true);
  let [titles, setTitles] = useState([]);
  let [searchQuery, setSearchQuery] = useState('')
  let router = useRouter()

  let searchTimeout;

  const doSearch = (query) => {
    clearTimeout(searchTimeout)
    if (!query) return setTitles([]);
    searchTimeout = setTimeout(() => {
      setSearchQuery(query);
    }, 400)
  }

  useEffect(() => {
    setIsLoading(true);
    searchTitles(searchQuery).then((data) => {
      if (data.error) {
        console.log(data.error)
        return
      }
      setTitles(data);
      setIsLoading(false)
    })
  }, [searchQuery])
  return (
      <>
        <Head>
          <title>Главная | Tangeki</title>
        </Head>
        <Stack padding='6'>
          <div style={isLoading ? {display: 'grid', placeItems: 'center'} : {}}>
            <Input  onChange={(e) => doSearch(e.target.value)} placeholder="Поиск" />
            {
              isLoading ? <Spinner size='xl' thickness='4px' speed='0.8s' marginTop={4}></Spinner> :
              <SimpleGrid marginTop={5} spacing={7} columns={2}>
              {
                titles.map((x) =>
                  <Stack key={x.id} onClick={(e) => router.push({
                    pathname: '/title',
                    query: {
                      id: x.id
                    }
                  })}>
                    <img style={{borderRadius: '12px'}} src={`${imageHost}${x.posters.small.url}`} />
                    <Text>{x.names.ru}</Text>
                  </Stack>
                )
              }
            </SimpleGrid>
            }
          </div>
        </Stack>
      </>
  )
}
