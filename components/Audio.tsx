import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Progress } from "./ui/progress"
import { openai } from "@/openai"

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
  const [audioData, setAudioData] = useState<string>("")
  const [output, setOutput] = useState<string | null>(null)
  const [subject, setSubject] = useState<string>("")
  const [loadingState, setLoadingState] = useState<number>(0)
  const loadingStates = [
    { status: "Upload an audio file", loading: 0 },
    { status: "Transcribing Audio: 45min rec = 2min wait", loading: 10 },
    { status: "Extracting Data", loading: 80 },
    { status: "Done", loading: 100 },
  ]

  async function getData(transcription: string) {
    console.log(transcription)
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: transcription },
        {
          role: "user",
          content: `
            You are a helpful assistant designed to output JSON.
            Use the information from this transcript from class,
            "equations"[] (name, equation) equations,
            "dates"[] (date, event) any sort of assignment or assesment that is due or should be done format as month (shorten) and the date then the event,
            "questions"[] (question, answer) any questions or important remarks with responces generate questions that could be asked about the topic,
            "summary" (summary of the content learned, be thorugh and include examples from class, quoted from the transcript).
            "concepts"[] (concept) main ideas listed in chronological order.
            If not applicable then predict what could be,
            `,
        },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    })
    console.log("out")
    console.log(completion.choices[0].message.content)
    return completion.choices[0].message.content
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  function subjectChange(e: any) {
    setSubject(e.target.value)
  }

  return (
    <div className="flex flex-col">
      <div className="m-auto my-8 border-2 p-4 rounded-md flex flex-col gap-2">
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
                setLoadingState(1)
                //await audioTranscribe()
                //setLoadingState(2)
                setAudioData(
                  "Ooh, I like it. Wow, that's cool. All right, so what I want to do is I go over how to solve or find the missing values of this triangle. So what we're given over here is we're given a triangle and we're given all the side lengths, all right? But we're not given any of the angles. So what we learned before is obviously you use the law of sines. And in the law of sines, it was a proportion, right? The side length over the sine of its opposing angle was equal to the side length of the opposing angle of all three of the other angles, right, and their opposing side length. But we have a problem with this because we can't apply or use that proportion because we don't even have a ratio that's complete, right? You can't even set up a proportion that would have only one missing values because you don't have any of the angles. So to try to use this, Kara, for law of sines is not going to work, all right? So what we're going to have to do is look into this by using the law of cosines. And there's a couple little tricks that we need to do in using the law of cosines, especially for a problem like this. You could say, well, I don't know what A, B, and C are. And you could see I wrote down the law of cosines over there. Well, for each one of those, they have a cosine of A, cosine of B, or cosine of C. So you could say, well, you could just pick any one you want to and solve for that angle. But the problem that we're going to want to come up with is we don't want to arbitrarily just pick any angle. There's one angle that I want to be able to solve for first of all. And I'll kind of explain a little bit more about this later, but the only angle when I have three side lengths, the angle that I want to solve for first is going to be the angle that is going to be potentially my largest angle, all right? So you could see out of all these side lengths, here's 10, here's 7, here's 15, the angle that is potentially going to be the – well, the angle that will be the largest is the one that obviously opens up to the largest side length. Does that make sense? Okay, so you're going to want to find the angle C, and I'll explain why we're going to find angle C first and why it's important to find angle C first rather than finding angle A or angle B. So let's go and write in the formula for the log cosines for angle C. So we have C squared equals A squared plus B squared minus 2 times A times B times cosine of C. All right, so now what we're going to do is just evaluate, plug in our values that we have, and then solve. So we have C squared, 15 squared equals 7 squared plus B squared, which is 10 squared, minus 2 times 7 times 10 times the cosine of C. So 15 squared is going to be 225 equals 49 plus 100, and then we have 2 times 7, which is 14, times 100 is going to be negative 140 cosine of C. Does everybody follow me so far? Okay. So then what we're just going to look at is we can combine these like terms. So we have 225 equals 149 minus 140 cosine of C. Right? Right? Then we subtract. And, sorry? Well, no, then you'll divide by negative 140. So this subtracts out the zero, and then this is going to leave us with 76. Then we divide by negative 140. So let me say, divided by negative 140. So therefore I'm going to have negative .5429 equals the cosine of C. But remember, ladies and gentlemen, we're trying to find the angle C. This is going to be way too much of a small of an angle if we're looking into, as far as this graph, that's a really, really small, cute angle, right? And we said it has to be the smallest angle or the largest angle, so that's not going to make sense. Remember, to find the angle C, it says cosine of my angle C equals this value. So to find the value of C, I'm now going to have to use inverse cosine of negative .5429. So I do inverse cosine, second answer, and I get C equals 122.88. So I get C equals 122.88 degrees. Okay, so why is that so important for us to be able to do this? Well, now, for the remaining sides, to find our remaining angles, now what we're going to have to do is apply the law of sines, right? And the important thing about noticing this is, remember when we applied the law of sines, we're going to have to use, again, the inverse sine, right? We're going to have to use the inverse sine to find one of these angles. And remember, using the inverse sine, we had to determine, was it acute or did we use the obtuse angle, right? Remember when we had the ambiguous case? We had those possible two different solutions, and what we always determined was, since we're figuring out this value, we know that these other two angles have to be acute. So you don't even need to worry about, even though we have three sides, it's not a side-side angle. But it's important for you guys to understand, now that I have an obtuse angle, now that I found the largest angle, I know that these two angles are acute. Or, even if this was acute, you still know that these other two angles also have to be acute, because this is the largest angle out of the three. So it's just important to always find the largest angle first, because then you know that your other two angles are always going to be acute. It's much easier to do that than to say, oh, I found an acute angle. The other two, one could be obtuse, one could be acute. It gets a little dicey working it that way. So now, to find angle A or B, we can just use the law of sines. I'll do A. So 7 over sine of A equals 15 over the sine of 122.88. So by solving for sine of A, sine of A equals, we could do 7 times sine of 122.88 divided by 15. So I get sine of A equals .3919. Then I take inverse sine, second answer, and I get A equals 23.07. And I did. Right, okay. All right. So then we get A is going to be 23 degrees .07, which obviously we know it has to be smaller than C. And now we're just going to evaluate for B. So now that we know that two angles, I can use the triangle angle sum theorem, which B is going to now equal 180 minus 23.07 minus 122.88. Because remember, all angles in a triangle add up to 180. So now I can just do 180 minus 23.07 minus 122.88. So A is 34.05. So B equals 34.05 degrees. Okay. And there you go. So apply the law of cosines, find the largest angle first, get that angle, plug it in, use law of sines to figure out your other angle, and then use your triangle angle sum theorem to find the third. Cool? Memorize what? No, if you look on your half sheet of paper that I gave you guys with . . ."
                )
                const out = await getData(audioData)
                setOutput(out)
                setLoadingState(3)
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
  )
}
