import Movie from "./Movie";

export default async function Home() {
  const data = await fetch(
    `${process.env.API_BASE_URL}/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();

  return (
    <main className="">
      <h1 className="text-4xl text-center my-12">Current Popular Movie</h1>
      <div className="grid gap-16 grid-cols-fluid">
        {res.results.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </main>
  );
}
