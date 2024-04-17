"use client"
import { gptAnalysis, audioTranscribe } from "@/actions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "@/firebase"

export default function Create() {
  const [selectedFile, setFile] = useState<File | undefined>(undefined)
  const [subject, setSubject] = useState<string>("")

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  async function handleAudioSubmission(e: any) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", selectedFile as File)

    try {
      console.log("calling")
      const res = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      })
      const result = await res.json()
      console.log(result.transcription)

      const docRef = await addDoc(collection(db, "notes"), {
        subject: subject,
        creator: "ayan",
        data: JSON.parse(result.transcription),
        date: new Timestamp(Date.now(), 0),
        title: "Add user defined title",
      })
      window.location.href = `/dashboard/note/${docRef.id}`
    } catch (error) {
      console.error("Failed to transcribe audio:", error)
    }
  }

  return (
    <div>
      <form onSubmit={handleAudioSubmission}>
        <div className="m-auto my-8 border-2 p-4 rounded-md flex flex-col gap-2">
          <p className="text-3xl font-semibold">Generate Notes</p>
          <div>
            <Label htmlFor="fileUpload">Upload your audio recording:</Label>
            <Input
              id="fileUpload"
              accept=".mp3, .wav, .m4a, .webm, .mp4"
              name="file"
              type="file"
              className="cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
          <Label htmlFor="subject">Subject</Label>
          <Select
            name="subject"
            onValueChange={(e) => {
              setSubject(e)
            }}
          >
            <SelectTrigger className="w-full" id="subject">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Mathematics</SelectLabel>
                <SelectItem value="algebra">Algebra</SelectItem>
                <SelectItem value="precalc">Pre Calculus</SelectItem>
                <SelectItem value="apcalcab">AP Calculus AB</SelectItem>
                <SelectItem value="apcalcbc">AP Calculus BC</SelectItem>
                <SelectItem value="geometry">Geometry</SelectItem>
                <SelectItem value="calculusaps">
                  Calculus Applications
                </SelectItem>
                <SelectItem value="statistics">Statistics</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Science</SelectLabel>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="environmentalscience">
                  Environmental Science
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Computer Science and Programming</SelectLabel>
                <SelectItem value="computerprogramming">
                  Computer Programming
                </SelectItem>
                <SelectItem value="computerscience">
                  Computer Science
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Social Sciences</SelectLabel>
                <SelectItem value="economics">Economics</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="psychology">Psychology</SelectItem>
                <SelectItem value="sociology">Sociology</SelectItem>
                <SelectItem value="ushistory">US History</SelectItem>
                <SelectItem value="worldhistory">World History</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="w-full" type="submit">
            Generate
          </Button>
        </div>
      </form>
    </div>
  )
}
