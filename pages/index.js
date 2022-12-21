import { useState } from "react"
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [genreInput, setGenreInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(ev) {
    ev.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ genre: genreInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setGenreInput("");
  }

  return (
    <div>
      <Head>
        <title>Name My Band</title>
        <link rel="icon" href="/band.png"/>
      </Head>
      <main>
        <Image src="/band.png" alt="icon of a band" width={75} height={75}/>
        <h2>Name My Band</h2>
        <form onSubmit={onSubmit}>
          <input type="text" name="genre" placeholder="Enter a genre" value={genreInput} onChange={(ev) => setGenreInput(ev.target.value)}/>
          <input type="submit" name="generate names"/>
        </form>
        <div>{result}</div>
      </main>
    </div>
  );
};