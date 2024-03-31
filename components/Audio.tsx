import { useState, useEffect } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Progress } from "./ui/progress"

import { Badge } from "@/components/ui/badge"
import Summary from "@/components/notes/Summary"
import Explain from "@/components/notes/Explain"
import Question from "@/components/notes/Questions"

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

export default function Audio() {
  const [selectedFile, setFile] = useState<File | undefined>(undefined)
  const [subject, setSubject] = useState<string>("")

  const [data, setData] = useState([
    { type: "summary", content: "This is a summary" },
  ])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  async function handleAudioSubmission(e: any) {
    console.log("starting")
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
      setData(JSON.parse(result.transcription))
      // Process the result as required
    } catch (error) {
      console.error("Failed to transcribe audio:", error)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
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

      <div className="w-4/5 h-fit border my-16 p-2 rounded-sm">
        <div className="p-4">
          <div className=" flex flex-row gap-2">
            <Badge className="font-mono font-light">{subject}</Badge>
            <Badge className="font-mono font-light">March 16, 2024</Badge>
          </div>
          <div className="mt-2 mb-6">
            <p className="text-6xl font-semibold">Relative Motion</p>
          </div>
          {data?.map((item: any, index: number) => {
            switch (item.type) {
              case "summary":
                return <Summary content={item.content} />
              case "explanation":
                return <Explain content={item.content} />
              case "equation":
                return <Explain content={item.content} />
              case "question":
                return (
                  <Question question={item.question} answer={item.answer} />
                )
            }
          })}
        </div>
      </div>
    </div>
  )
}
