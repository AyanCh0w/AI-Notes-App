import fs from "fs";
import path from "path";
import { File } from "formidable";
import { openai } from "../openai";

export const transcribeFile = async (audioFile: File) => {
  const extension = path.extname(audioFile.originalFilename!);
  const newpath = audioFile.filepath + extension;
  fs.rename(audioFile.filepath, newpath, (err) => console.log(err));
  return await openai.audio.transcriptions.create({
    file: fs.createReadStream(newpath),
    model: "whisper-1",
  });
};

export async function gptAnalysis(transcription: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: transcription },
      {
        role: "user",
        content: `
          generate info in json in this format in chronological order from this transcript.
          For summary, summarize the section throughly in the style of notes.
          this is an example of the format, extract data in that format and use these types as needed. There should be some explanations
          it all has to be in the root list
          do not make up new types, only use the ones listed
          have the data stored and returned in on big list
          try to output as much as possible

          THE RESPONSE HAS TO BE IN A LIST
          Generate more than one module

          [
            { "type": "summary", "content": "This is a summary" },
            {"type": "explanation", "content":"extra detailed explanation on specific part"},
            { "type": "equation", "content": "y = mx+b" },
            { "type": "summary", "content": "This is a summary" },
            {
              "type": "question",
              "question": "how do i do this?",
              "answer": "this is an answer"
            },
            { "type": "summary", "content": "This is a summary" }
          ]
          `,
      },
    ],
    model: "gpt-3.5-turbo",
    //response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content;
}
