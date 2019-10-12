import fetch from "isomorphic-unfetch";
import MainLayout from "../layouts/main";

const PORT = process.env.PORT || 3000;

function Home({ podcasts }) {
  return (
    <MainLayout>
      <div className="bg-indigo-100 py-16">
        <div className="flex flex-wrap container mx-auto items-stretch">
          {podcasts.map(podcast => {
            return (
              <div key={podcast.title} className="w-full h-full md:w-1/2 p-4">
                <div className="flex bg-white items-center rounded-lg shadow-lg w-full">
                  <a href={podcast.url} target="_blank" className="w-1/3">
                    <img
                      className="rounded-lg rounded-r-none"
                      alt={`${podcast.title} Poster`}
                      src={podcast.image}
                    />
                  </a>
                  <div className="w-2/3 px-4">
                    <p className="text-xl font-semibold">
                      <a href={podcast.url} target="_blank">
                        <span
                          dangerouslySetInnerHTML={{ __html: podcast.title }}
                        />
                      </a>
                    </p>
                    <p className="w-1/2 flex my-2">
                      <svg
                        className={`block w-6 ${
                          podcast.rating > 0
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <svg
                        className={`block w-6 ${
                          podcast.rating > 1
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <svg
                        className={`block w-6 ${
                          podcast.rating > 2
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <svg
                        className={`block w-6 ${
                          podcast.rating > 3
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <svg
                        className={`block w-6 ${
                          podcast.rating > 4
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

Home.getInitialProps = async function() {
  const res = await fetch(
    `${process.env.FUNCTIONS_HOST}.netlify/functions/podcasts`
  );
  let data = {};
  try {
    data = await res.json();
  } catch (error) {
    data = [];
  }

  return {
    podcasts: data
  };
};

export default Home;
