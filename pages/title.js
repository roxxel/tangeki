import {Button, List, Spinner, Stack, Text} from "@chakra-ui/react";
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
} from '@chakra-ui/react'

const TitlePage = () => {
    let [title, setTitle] = useState(null)
    let [isLoading, setIsLoading] = useState(true);
    let router = useRouter()
    let id = null;
    let player;
    let [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
    useEffect(() => {
        if (!router.query.id || id) return;
        id = router.query.id
        getTitles([router.query.id], null).then((data) => {
            if (data.error)
                return console.log(data.error)
            setTitle(data[0])
            //wait for page to render
            setTimeout(() => {
                let t = data[0]
                player = new Playerjs({
                    id:'player',
                    poster: `${imageHost}${t.posters.original.url}`,
                    file:
                        t.player.playlist.map(x => {
                            return {"title":`Серия ${x.serie}`, 'file':`[720p]//${t.player.host}${x.hls.hd},[480p]//${t.player.host}${x.hls.sd}`}
                        })

                })

            }, 500)
        }).finally(() => setIsLoading(false))
    }, [router.query.id])

    return (
        <>
            <Head>
                <title>{title?.names?.ru} {title ? '| Tangeki' : 'Tangeki'}</title>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script type="text/javascript" src='./playerjs.js'></script>
            </Head>
            <Stack style={{display: 'grid', placeItems: 'center'}}>
                <Stack>
                    {
                        isLoading ? <Spinner colorScheme='white' size='xl'  thickness='4'></Spinner> :
                            !title ? <Text fontSize='xl'>Ничего не найдено</Text> :
                                <Stack marginTop={4}>
                                    <Stack alignItems='center'>
                                        <img style={{borderRadius: '12px'}} src={`${imageHost}${title.posters.original.url}`} width={'200px'} />
                                        <Text textAlign='center' fontSize='xl'>{title.names.ru}</Text>
                                        <Text textAlign='center' color='gray.500'>{title.names.en}</Text>
                                    </Stack>
                                    <Stack paddingLeft={4} paddingRight={4}>
                                        <Text textAlign='left' color='gray.500'>{`Жанры: ${title.genres.join(', ')}`}</Text>
                                        <Text textAlign='left' color='gray.500' noOfLines={2} textOverflow='ellipsis'>{title.description}</Text>
                                        <Button alignSelf='end' size='xs' onClick={(e) => setIsDescriptionModalOpen(true)} maxWidth={'100px'}>Подробнее</Button>
                                    </Stack>
                                    <Text paddingLeft={4}>Плеер</Text>
                                    <Stack padding={4}>
                                        <div id="player" />
                                    </Stack>
                                </Stack>
                    }
                </Stack>
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