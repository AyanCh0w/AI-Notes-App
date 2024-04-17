"use client"
import { Badge } from "@/components/ui/badge"
import Explain from "@/components/notes/Explain"
import Summary from "@/components/notes/Summary"
import Question from "@/components/notes/Questions"
import { useEffect, useState } from "react"
import NoteSkeleton from "@/components/NoteSkeleton"

import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { Button } from "@/components/ui/button"
import { noteData } from "@/types"

export default function Note({ params }: any) {
  const [data, setData] = useState<noteData | undefined>(undefined)

  useEffect(() => {
    async function get() {
      const querySnapshot = await getDocs(collection(db, "notes"))
      querySnapshot.forEach((doc) => {
        if (doc.id == params.id) {
          setData(doc.data() as noteData)
          console.log(doc.data())
        }
      })
    }
    get()
  }, [])

  return (
    <div>
      {data ? (
        <>
          <div className="w-4/5 h-fit border my-16 p-2 rounded-sm mx-auto">
            <div className="p-4">
              <div className=" flex flex-row gap-2">
                <Badge className="font-mono font-light">{data.subject}</Badge>
                <Badge className="font-mono font-light">
                  {data.date.toDate().toDateString()}
                </Badge>
              </div>
              <div className="mt-2 mb-6">
                <p className="text-6xl font-semibold">Relative Motion</p>
              </div>
              {data.data?.map((item: any, index: number) => {
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
