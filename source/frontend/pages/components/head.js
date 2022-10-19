import React from 'react';
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = 'SIPENGADU'
const defaultOGURL = 'https://sipengadu.manudjaya.com/'
const defaultOGImage = 'https://manudjaya.com/public/logo.png'
const defaultKeywords = 'Aplikasi pengaduan untuk warga desa Manud Jaya'
const Head = props => (
    <NextHead>
        <meta charSet="UTF-8" />
        <title>{props.title || 'Swantik'}</title>
        <meta name="description" content={props.description || defaultDescription}/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={props.keywords || defaultKeywords}/>
        <link rel="shortcut icon" href="/swantik.ico" type="image/x-icon"/>
        <link rel="apple-touch-icon" type="image/x-icon" href="/swantik.ico"/>
        <link rel="apple-touch-icon" type="image/x-icon" sizes="72x72" href="/swantik.ico"/>
        <link rel="apple-touch-icon" type="image/x-icon" sizes="114x114" href="/swantik.ico"/>
        <link rel="apple-touch-icon" type="image/x-icon" sizes="144x144" href="/swantik.ico"/>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>
        
        <meta property="og:url" content={props.url || defaultOGURL} />
        <meta property="og:title" content={props.title || 'swantik.com'}/>
        <meta property="og:description" content={props.description || defaultDescription}/>
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={props.title || 'swantik.com'}/>
        <meta name="twitter:description" content={props.description || defaultDescription}/>
        <meta name="twitter:site" content={props.url || defaultOGURL} />
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
        <meta property="og:image" content={props.ogImage || defaultOGImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta httpEquiv="imagetoolbar" content="no" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
    </NextHead>
)
Head.propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string,
    keywords: string
}
  
export default Head;