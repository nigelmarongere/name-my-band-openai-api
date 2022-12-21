import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model:"text-davinci-002",
    prompt: generatePrompt(req.body.genre),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(genre){
  const capitalizedGenre = genre[0].toUpperCase() + genre.slice(1).toLowerCase();
  return `Suggest three genre specific names for a band.
  
  Genre: Psychedelic rock
  Names: The Beatles, Pink Floyd, Jefferson Airplane
  Genre: Jazz
  Names: Rat Pack, Modern Jazz Quartet, Glenn Miller Orchestra
  Genre: ${capitalizedGenre}
  Names: `;
}
