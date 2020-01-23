import Head from "next/head";
import "../styles/index.css";

function MainLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Podcasts I Listen To</title>
        <link rel="canonical" href="https://podcasts.michaelbonner.dev" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WKV6C4B');`
          }}
        />

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WKV6C4BX" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`
          }}
        />
      </Head>
      <div className="bg-indigo-800 text-indigo-100 py-12">
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
      <div className="bg-indigo-900 text-indigo-100 pt-16 px-4 lg:px-0 text-center lg:text-left">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <a className="w-full lg:w-auto" href="https://overcast.fm/">
              <img
                className="w-32 mx-auto lg:mx-0"
                src="https://overcast.fm/img/logo.svg?3"
                alt="overcast"
              />
            </a>
            <div className="w-full lg:w-auto pl-0 lg:pl-6">
              <h2 className="text-2xl font-semibold pt-4">
                <a
                  className="w-full lg:w-auto underline"
                  href="https://overcast.fm/"
                >
                  Check out Overcast for free
                </a>
              </h2>
              <p className="text-gray-500 pt-1">
                A powerful yet simple podcast player for iPhone, iPad, and Apple
                Watch.
              </p>

              <a href="https://itunes.apple.com/us/app/overcast-podcast-player/id888422857?ls=1&amp;mt=8">
                <img
                  className="pt-6 mx-auto lg:mx-0"
                  src="https://overcast.fm/img/appstore.svg"
                  alt="Download"
                />
              </a>
            </div>
          </div>

          <p className="mt-8 py-8 text-gray-300 border-t border-indigo-800">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://michaelbonner.dev/">Michael Bonner</a>
            <span className="px-4 text-purple-800">|</span>
            <a
              className="pr-4"
              href="https://github.com/michaelbonner/podcasts-i-listen-to"
            >
              GitHub
            </a>
            <a href="https://www.instagram.com/michael__bonner/">Instagram</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
