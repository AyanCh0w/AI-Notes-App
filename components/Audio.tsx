import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

export default function Audio() {
  const [selectedFile, setFile] = useState<File | undefined>(undefined);
  const [audioData, setAudioData] = useState<string>("");
  const [output, setOutput] = useState<string | null>(null);
  const [subject, setSubject] = useState<string>("");
  const [loadingState, setLoadingState] = useState<number>(0);
  const loadingStates = [
    { status: "Upload an audio file", loading: 0 },
    { status: "Transcribing Audio: 45min rec = 2min wait", loading: 10 },
    { status: "Extracting Data", loading: 80 },
    { status: "Done", loading: 100 },
  ];

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  function subjectChange(e: any) {
    setSubject(e.target.value);
  }

  async function handleAudioSubmission(audioFile: File) {
    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const res = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      console.log(result.transcription);
      // Process the result as required
    } catch (error) {
      console.error("Failed to transcribe audio:", error);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="m-auto my-8 flex flex-col gap-2 rounded-md border-2 p-4">
        <div>
          <Label htmlFor="fileUpload">Upload your audio recording:</Label>
          <Input
            id="fileUpload"
            accept=".mp3, .wav"
            type="file"
            className="cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
        <Select>
          <SelectTrigger className="w-full">
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
              <SelectItem value="calculusaps">Calculus Applications</SelectItem>
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
              <SelectItem value="computerscience">Computer Science</SelectItem>
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
          <input type="hidden" value={subject} />
        </Select>
        {(loadingState == 0 && selectedFile != undefined) ||
        loadingState == 3 ? (
          <Button
            className="w-full"
            onClick={async () => {
              if (selectedFile) {
                console.log(selectedFile);
                handleAudioSubmission(selectedFile);
              }
            }}
          >
            Transcribe
          </Button>
        ) : (
          <Button disabled>Transcribe</Button>
        )}

        <p>{loadingStates[loadingState].status}</p>
        <Progress value={loadingStates[loadingState].loading} />
      </div>
      <p className="m-auto w-5/6 border p-4">{output}</p>
    </div>
  );
}
