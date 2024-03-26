"use server"
import { NextResponse } from "next/server"

export async function audioTranscribe(selectedFile: File) {
  console.log(selectedFile)
  const formData = new FormData()
  formData.append("file", selectedFile)
  formData.append("model", "whisper-1")

  const headers = new Headers()
  headers.append("Authorization", "Bearer " + process.env.OPENAI_APIKEY)

  let res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    body: formData,
    headers: headers,
  })

  return res
}
