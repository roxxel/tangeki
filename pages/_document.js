import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                    />
                    <meta name="description" content="Anilibria" />
                    <meta name="keywords" content="Anilibria" />

                    <link rel="manifest" href="/manifest.json" />
                    <link
                        href="/icons/icon-48x48.png"
                        rel="icon"
                        type="image/png"
                        sizes="48x48"
                    />
                    <link rel="apple-touch-icon" href="/icons/icon-72x72.png"></link>
                    <meta name="theme-color" content="#3182ce" />
                </Head>
                <body>
                <ColorModeScript initialColorMode='dark' />
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}