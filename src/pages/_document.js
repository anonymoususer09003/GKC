import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className=' bg-white' lang="en">
      <Head />
      <body className='' style={{overflowX:'hidden'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
