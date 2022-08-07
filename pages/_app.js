import { ChakraProvider } from '@chakra-ui/react'

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import Head from "next/head";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#fd4d4d',
  },
}

const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  return (
      <>

        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
      </>
  )
}

export default MyApp;