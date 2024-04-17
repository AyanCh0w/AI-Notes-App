"use client"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Button } from "@/components/ui/button"

export default function Home() {
  async function add() {
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        subject: "physics",
        creator: "ayan",
        data: [
          {
            type: "summary",
            content: "This is a summary",
          },
        ],
        date: new Date(),
      })
      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  return (
    <main>
      <p>Home Page</p>
      <Button onClick={() => add()}>Add</Button>
    </main>
  )
}
