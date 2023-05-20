import Image from "next/image";

const apiBaseUrl = process.env.API_BASE_URL;
const apiKey = process.env.API_KEY;
const imagePath = process.env.IMAGE_PATH;

// pre render movie detail?
export async function generateStaticParams() {
  const data = await fetch(`${apiBaseUrl}/movie/popular?api_key=${apiKey}`);
  const res = await data.json();
  return res.results.map((movie) => ({
    movieId: toString(movie.id),
  }));
}

export default async function MovieDetail({ params }) {
  const { movieId } = params;
  // revalidate akan melakukan fetch data ulang saat membuka halaman ini dalam waktu yang ditentukan (satuan detik)
  const data = await fetch(`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`, {
    next: { revalidate: 30 },
  });
  const res = await data.json();
  return (
    <>
      <h2 className="text-2xl">{res.title}</h2>
      <h2 className="text-lg">{res.release_date}</h2>
      <h2>Runtime: {res.runtime} minutes</h2>
      <h2 className="bg-green-600 inline-block my-2 py-2 px-4 rounded-md text-sm">
        {res.status}
      </h2>
      <Image
        className="my-12 w-full"
        src={imagePath + res.backdrop_path}
        width={1000}
        height={1000}
        alt={res.title}
        priority
      />
      <p>{res.overview}</p>
    </>
  );
}
