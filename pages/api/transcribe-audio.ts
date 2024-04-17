import type { NextApiRequest, NextApiResponse } from "next"
import { IncomingForm, Fields, Files } from "formidable"
import { transcribeFile, gptAnalysis } from "@/lib/gpt"

async function parseFormData(
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> {
  const form = new IncomingForm()
  return new Promise((resolve, reject) => {
    form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405)
  }

  const data = await parseFormData(req)
  const audioFile = data.files.file && data.files.file[0]

  if (audioFile && audioFile.originalFilename) {
    const transcription = await transcribeFile(audioFile)
    console.log(transcription.text)
    const message = await gptAnalysis(transcription.text)
    console.log(message)

    return res.status(200).json({ transcription: message })
  }

  return res.status(400).json({ data: null })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
