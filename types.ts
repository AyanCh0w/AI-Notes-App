import { Timestamp } from "firebase/firestore"

interface transcriptionData {
  type: string
  content: string
}

export interface noteData {
  subject: string
  creator: string
  data: transcriptionData[]
  date: Timestamp
  title: string
}
