import Image from "next/image";
import Link from "next/link";

export default function Movie({ id, title, poster_path, release_date }) {
  return (
    <div>
      <h1>{title}</h1>
      <h2 className="mb-2">{release_date}</h2>
      <Link href={`/${id}`}>
        <Image
          src={process.env.IMAGE_PATH + poster_path}
          width={800}
          height={800}
          alt=""
        />
      </Link>
    </div>
  );
}
