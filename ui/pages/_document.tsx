import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className={``}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    {/* Google Fonts  */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin={'true'}
                    />
                    {/* Moon Dance font from Google Fonts  */}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Moon+Dance&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className={`min-h-screen`}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
