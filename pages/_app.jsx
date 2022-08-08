import { ChakraProvider, Image, Stack, Text } from '@chakra-ui/react'

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import Head from "next/head";
import { useRouter } from "next/router";
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#fd4d4d',
  },
}

const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  let router = useRouter()
  return (
      <>
        
        <ChakraProvider theme={theme}>
            <Stack onClick={(e) => router.push('/')}  _hover={{cursor: 'pointer'}} paddingLeft={[6, 10, 16, 24, 72]} paddingBottom={4} flexDirection='row' alignItems='center' paddingRight={[6, 10, 16, 24, 72]} paddingTop={[4, 6, 8, 12, 16]}>
              <Image src='/icons/icon-96x96.png' width={[12,16,20,24]} />
              <Text paddingLeft='12px' fontSize='3xl'>Tangeki</Text>
            </Stack>
            <Component {...pageProps} />
        </ChakraProvider>
      </>
  )
}

export default MyApp;