import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NavBar() {
  return (
    <div className="w-screen h-12 border shadow flex flex-row items-center justify-between px-12">
      <div>
        <Button variant={"link"}>
          <Link href={"/"}>Home</Link>
        </Button>
        <Button variant={"link"}>
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
        <Button variant={"link"}>
          <Link href={"/dashboard/create"}>Create</Link>
        </Button>
      </div>
      <p className=" font-medium text-xl">Delta</p>
      <div>
        <Button variant={"ghost"}>Login</Button>
      </div>
    </div>
  )
}
