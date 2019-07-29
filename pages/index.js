import podcasts from "../data/podcasts";
import MainLayout from "../layouts/main";

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
                  <p className="w-2/3 px-4 text-xl font-semibold">
                    <a href={podcast.url} target="_blank">
                      <span
                        dangerouslySetInnerHTML={{ __html: podcast.title }}
                      />
                    </a>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

Home.getInitialProps = async () => {
  return { podcasts };
};

export default Home;
