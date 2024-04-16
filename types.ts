interface transcriptionData {
  type: string
  content: string
}

interface noteData {
  subject: string
  creator: string
  data: transcriptionData[]
  date: Date
}
