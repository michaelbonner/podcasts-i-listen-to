import useWindowSize from "./useWindowSize";

const WideMonitor = () => {
  const { width } = useWindowSize();
  if (!width || width <= 3000) return null;

  return (
    <div className="fixed right-0 bottom-0 mr-16 mb-16 rounded-lg shadow-lg bg-sky-700">
      <video
        autoPlay
        className="rounded-t-lg shadow-sm"
        loop
        muted
        playsInline
        src="/rick-and-morty-i-like-what-you-got.mp4"
      />
      <p className="py-5 px-4 text-2xl font-semibold text-center text-sky-100">
        Wow you have a wide monitor &#129299;
      </p>
    </div>
  );
};

export default WideMonitor;
