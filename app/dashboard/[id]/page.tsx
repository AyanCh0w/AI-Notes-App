import { Badge } from "@/components/ui/badge"
import Explain from "@/components/notes/Explain"
import Summary from "@/components/notes/Summary"
import Question from "@/components/notes/Questions"
import { useEffect, useState } from "react"
import NoteSkeleton from "@/components/NoteSkeleton"

export default function Note() {
  const [subject, setSubject] = useState<string>("")
  const [data, setData] = useState<transcriptionData[] | undefined>(undefined)

  useEffect(() => {
    setData([{ type: "summary", content: "This is a summary" }])
  }, [])

  return (
    <div>
      {data ? (
        <>
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
                    return <Summary content={item.content} key={index} />
                  case "explanation":
                    return <Explain content={item.content} key={index} />
                  case "equation":
                    return <Explain content={item.content} key={index} />
                  case "question":
                    return (
                      <Question
                        question={item.content.split("|")[0]}
                        answer={item.content.split("|")[1]}
                        key={index}
                      />
                    )
                }
              })}
            </div>
          </div>
        </>
      ) : (
        <NoteSkeleton />
      )}
    </div>
  )
}
