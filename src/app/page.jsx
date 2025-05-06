// app/page.jsx (assuming app router)
export const metadata = {
  title: "PleasureX",
  description: "Moments of Pleasure",
};

async function getEpornerVideos() {
  const res = await fetch(
    "https://www.eporner.com/api/v2/video/search/?per_page=50&query=all&thumbsize=medium&order=top-week&lq=true&format=json",
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/89.0.4389.82 Safari/537.36"
      },
      cache: "no-store", // Avoid caching in server component
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch videos from ePorner API");
  }

  const data = await res.json();
  return data.videos;
}


export default async function Home() {
  let videos = [];

  try {
    videos = await getEpornerVideos();
  } catch (error) {
    console.error("Failed to fetch videos:", error);
  }

  return (
    <main className="bg-black min-h-screen text-white px-4 md:px-8 py-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-pink-500">PleasureX</h1>
        <nav className="space-x-4 text-sm md:text-base">
          <button className="hover:text-pink-400">Home</button>
          <button className="hover:text-pink-400">Categories</button>
          <button className="hover:text-pink-400">Live</button>
          <button className="hover:text-pink-400">Favorites</button>
          <button className="hover:text-pink-400">Login</button>
        </nav>
      </header>

      {/* Section: Top This Week */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">🔥 Top This Week</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {videos.map((video) => (
            <a
              href={video.url}
              key={video.id}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
            >
              <img
                src={video.default_thumb.src}
                alt={video.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <p className="text-sm font-semibold line-clamp-2">{video.title}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-12">
        © 2025 PleasureX. Powered by ePorner API.
      </footer>
    </main>
  );
}
