import {Box, Button, Grid, List, Spinner, Stack, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Head from "next/head";
import {imageHost, getTitles} from "../services/anilibria";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    ModalCloseButton,
    Alert,
    AlertIcon
} from '@chakra-ui/react'

import { StarIcon } from '@chakra-ui/icons'

const TitlePage=() => {
    let [title, setTitle]=useState(null)
    let [isLoading, setIsLoading]=useState(true);
    let router=useRouter()
    let id=null;
    let player;
    let [isDescriptionModalOpen, setIsDescriptionModalOpen]=useState(false)
    useEffect(() => {
        if(!router.query.id||id) return;
        id=router.query.id
        getTitles([router.query.id], null).then((data) => {
            if(data.error)
                return console.log(data.error)
            setTitle(data[0])
            //wait for page to render
            setTimeout(() => {
                let t=data[0]
                player=new Playerjs({
                    id: 'player',
                    poster: `${imageHost}${t.posters.original.url}`,
                    file:
                        t.player.playlist.map(x => {
                            return {"title": `Серия ${x.serie}`, 'file': `[720p]//${t.player.host}${x.hls.hd},[480p]//${t.player.host}${x.hls.sd}`}
                        })

                })

            }, 500)
        }).finally(() => setIsLoading(false))
    }, [router.query.id])

    return (
        <>
            <Head>
                <title>{title?.names?.ru} {title? '| Tangeki':'Tangeki'}</title>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script type="text/javascript" src='./playerjs.js'></script>
            </Head>
            <style jsx global>{`
                .pjscssed {
                    border-radius: 6px;
                }
                #player {
                    display: flex;
                    justify-content: center;
                }
            `}</style>
            <Stack justifyContent='center' paddingLeft={[6, 10, 16, 24, 96]} paddingRight={[6, 10, 16, 24, 96]}>
                
                    {
                        isLoading? <Spinner colorScheme='white' size='xl' thickness='4'></Spinner>:
                            !title? <Text fontSize='xl'>Ничего не найдено</Text>:
                                <Stack justifyContent='center' marginTop={4}>
                                    <Stack justifyContent='center' flexDirection={['column', 'column', 'row']}>
                                        <Stack alignItems='center'>
                                            <img style={{borderRadius: '12px'}} src={`${imageHost}${title.posters.original.url}`} width={'230px'} />
                                            <Text textAlign='center' maxWidth='230px' fontSize='xl'>{title.names.ru}</Text>
                                            <Text textAlign='center' color='gray.500'>{title.names.en}</Text>
                                            <Stack flexDirection='row'  justifyContent='center' justifyItems='center'>
                                                <StarIcon size='24px' color='yellow.500' />
                                                <Text paddingLeft='8px' marginTop='-3.5px !important'>{title.in_favorites}</Text>
                                            </Stack>
                                        </Stack>
                                        <Stack justifyContent='center' paddingLeft={4} paddingRight={4} maxWidth={['100%', '100%', '400px', '700px']}>
                                            <Text textAlign='left' color='gray.500'>{`Жанры: ${title.genres.join(', ')}`}</Text>
                                            <Text textAlign='left' color='gray.500' noOfLines={[2, 4, 8, 16, 32]} textOverflow='ellipsis'>{title.description}</Text>
                                            <Button alignSelf='end' size='xs' onClick={(e) => setIsDescriptionModalOpen(true)} maxWidth={'100px'}>Подробнее</Button>
                                            {title.announce ? 
                                            <Alert status='info' borderRadius='8px'>
                                                <AlertIcon />
                                                {title.announce}
                                            </Alert> : null}
                                        </Stack>
                                    </Stack>
                                    <Grid placeItems='center'>
                                        <Text paddingLeft={4}>Плеер</Text>
                                        <Box padding={4} minHeight={['100%']} minWidth={['100%', '100%','90%','60%']}>
                                            <div id="player" style={{borderRadius: '12px'}} />
                                        </Box>
                                    </Grid>
                                </Stack>
                    }
                
            </Stack>
            <Modal isOpen={isDescriptionModalOpen} onClose={() => {}}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Описание</ModalHeader>
                    <ModalCloseButton onClick={(e) => setIsDescriptionModalOpen(false)} />
                    <ModalBody>
                        {title?.description}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TitlePage