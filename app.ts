import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

const main = async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Assume the text file is located in the same directory as the script
  const filePath = "./titles.txt";

  // Read the file line by line
  const stream = fs.createReadStream(filePath, { encoding: "utf8" });
  const headlines = new Set<string>();

  stream.on("data", (chunk: string) => {
    // Split the chunk into lines
    const lines = chunk.split("\n");

    // Process each line
    for (const line of lines) {
      if (line.length > 12) {
        headlines.add(line);
      }
    }
  });

  stream.on("end", async () => {
    console.log("Finished reading file");

    const lines = Array.from(headlines);
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];

      const prompt = `Write a long, very detailed, highly SEO optimized article on '${line}'. The writing must be very engaging, and informative. Cover all factors. Write 5000 words minimum. Wrap the headings HTML strong tags and list itmes in strongs tags.`;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 1,
        max_tokens: 4000,
      });

      const data = response.data.choices[0].text;
      const fileName = line.replace(/[^a-zA-Z ]/g, "");

      if (data) {
        const saveData = data.replace(/(\r\n|\n|\r)/gm, "");
        fs.writeFileSync(`output/${fileName}.html`, saveData);
      }
    }
  });
};
main();
