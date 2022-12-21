import { useState } from "react"
import Head from "next/head";
import Image from "next/image";
import { TextField, Button, Typography } from "@mui/material";


export default function Home() {
  const [genreInput, setGenreInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("./api/generate", {
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
      <main display="flex" flex-direction="column" align-items="center">
        <Image src="/band.png" alt="icon of a band" width={80} height={80}/>
        <br/>
        <Typography variant="h5">Name My Band</Typography>
        <br/>
        <form onSubmit={onSubmit}>
          <TextField id="outlined-basic" size="small" label="Enter a genre" value={genreInput} onChange={(event) => setGenreInput(event.target.value)}/>
          <br/>
          <h3></h3>
          <Button type="submit" name="generate names" variant="contained" size="small">Submit</Button>
        </form>
        <br/>
        <Typography variant="body1">{result}</Typography>
      </main>
    </div>
  );
};