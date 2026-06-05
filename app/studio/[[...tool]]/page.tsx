import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { StudioClient } from "./studio-client"

export default async function StudioPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/studio/login")
  }

  return <StudioClient />
}