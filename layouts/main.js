import Head from "next/head";

function MainLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Podcasts I Listen To</title>
        <link rel="canonical" href="https://podcasts.michaelbonner.dev" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
        <meta
          name="Description"
          content="The podcasts that Michael Bonner listens to. Just an easy way to share with my friends."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://podcasts.michaelbonner.dev/" />
        <meta property="og:title" content="Podcasts I Listen To" />
        <meta
          property="og:description"
          content="The podcasts that Michael Bonner listens to. Just an easy way to share with my friends."
        />
        <meta
          property="og:image"
          content="https://podcasts.michaelbonner.dev/og-image.jpg"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WKV6C4B');`,
          }}
        />

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WKV6C4BX" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`,
          }}
        />

        <link rel="preconnect" href="https://overcast.fm" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </Head>
      <div className="text-indigo-100 py-12">
        <div className="container mx-auto flex flex-wrap items-center justify-center">
          <h1 className="text-center text-5xl">The Podcasts I Listen To</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon-microphone w-12 h-12 ml-4"
          >
            <path
              className="secondary text-indigo-400 fill-current"
              d="M12 1a4 4 0 0 1 4 4v6a4 4 0 1 1-8 0V5a4 4 0 0 1 4-4z"
            />
            <path
              className="primary text-indigo-600 fill-current"
              d="M13 18.94V21h3a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2h3v-2.06A8 8 0 0 1 4 11a1 1 0 0 1 2 0 6 6 0 1 0 12 0 1 1 0 0 1 2 0 8 8 0 0 1-7 7.94z"
            />
          </svg>
        </div>
      </div>
      {children}
      <div className="text-indigo-100 px-4 lg:px-0 text-center lg:text-left">
        <div className="container mx-auto text-center lg:flex lg:flex-wrap lg:justify-between lg:items-center text-gray-300 pt-12 pb-10">
          <div className="lg:flex lg:flex-wrap">
            <p className="pt-4 lg:pt-0 lg:pr-4 lg:mr-4">
              &copy; {new Date().getFullYear()}{" "}
              <a
                className="font-semibold hover:underline"
                href="https://michaelbonner.dev/"
              >
                Michael Bonner
              </a>
            </p>
            <p className="pt-4 lg:pt-0 lg:pr-4 lg:mr-4">
              <a
                className="font-semibold hover:underline"
                href="https://bootpackdigital.com/"
              >
                Bootpack Digital, LLC
              </a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-end">
            <p className="pt-4 lg:pt-0">
              <a
                className="font-semibold hover:underline"
                href="https://github.com/michaelbonner/podcasts-i-listen-to"
              >
                <svg
                  className="fill-current w-10 h-10 mx-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  height="512"
                  viewBox="0 0 512 512"
                >
                  <title>GitHub</title>
                  <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z" />
                </svg>
              </a>
            </p>
            <p className="pt-4 lg:pt-0">
              <a
                className="font-semibold hover:underline"
                href="https://www.instagram.com/michael__bonner/"
              >
                <svg
                  className="fill-current w-10 h-10 mx-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  height="512"
                  viewBox="0 0 512 512"
                >
                  <title>Instagram</title>
                  <path d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z" />
                  <path d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z" />
                  <path d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z" />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
