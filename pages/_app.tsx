import MDXComponents from '@/components/MdxComponent'
import * as gtag from '@/lib/gtag'
import { MDXProvider } from '@mdx-js/react'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import SEO from '../next-seo.config'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.preview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <MDXProvider components={MDXComponents}>
                <Head>
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                </Head>
                <DefaultSeo {...SEO} />
                <Component {...pageProps} />
            </MDXProvider>
        </ThemeProvider>
    )
}

export default MyApp
