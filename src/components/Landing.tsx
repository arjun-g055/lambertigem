export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto p-8 text-center">
        <img
          src="https://gbditp38bksey5gu.public.blob.vercel-storage.com/igemLogo.png"
          alt="iGEM logo"
          className="
                    mx-auto
                    h-36
                    w-auto
                    mb-6
                    transition
                    duration-300
                    hover:drop-shadow-[0_0_4em_#C92C2A]"
        />

        <h1 className="text-6xl font-bold mb-2">
          Lambert iGEM
        </h1>

        <p className="text-gray-500 mt-6">
          This website is under construction.
        </p>
      </div>
    </div>
  );
}