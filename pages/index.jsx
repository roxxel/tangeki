import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Input, List, ListItem, SimpleGrid, Spinner, Stack, Text, Image} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import { imageHost, getTitles, searchTitles } from '../services/anilibria'
import {useRouter} from "next/router";


export default function Home() {
  let [isLoading, setIsLoading] = useState(false);
  let [titles, setTitles] = useState([]);
  let [searchQuery, setSearchQuery] = useState('')
  let router = useRouter()

  let searchTimeout;

  const doSearch = (query) => {
    clearTimeout(searchTimeout)
    if (!query) return setTitles([]);
    searchTimeout = setTimeout(() => {
      router.push({pathName: '/', query: {q: query}}, undefined, {shallow: true})
      setSearchQuery(query)
    }, 400)
  }

  useEffect(() => {
    if (!router.query.q) return;
    if (searchQuery === '') {
      setSearchQuery(router.query.q)
    }
  }, [router.query.q])

  useEffect(() => {
    if (!router.query.q || isLoading) return;
    setIsLoading(true);
    searchTitles(router.query.q).then((data) => {
      console.log(data)
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
        <Stack paddingLeft={[6, 10, 16, 24, 32]} paddingRight={[6, 10, 16, 24, 32]} paddingTop={[6, 10, 16, 24, 48]}>
          <div style={isLoading ? {display: 'grid', placeItems: 'center'} : {}}>
            <Input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); doSearch(e.target.value) }} placeholder="Поиск" />
            {
              isLoading ? <Spinner size='xl' thickness='4px' speed='0.8s' marginTop={4}></Spinner> :
              <SimpleGrid marginTop={5} spacing={7} minChildWidth='150px'>
              {
                titles.map((x) =>
                  <Stack maxWidth='150px' key={x.id} _hover={{cursor: 'pointer'}} onClick={(e) => router.push({
                    pathname: '/title',
                    query: {
                      id: x.id
                    }
                  })}>
                    <Image  _hover={{transform: 'scale(1.05)'}} style={{borderRadius: '12px', transition: "all 0.25s ease-in-out"}} src={`${imageHost}${x.posters.small.url}`} />
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
