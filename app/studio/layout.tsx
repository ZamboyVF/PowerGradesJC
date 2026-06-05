import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Power Grades Studio",
  description: "CMS interno — acceso restringido",
  robots: { index: false, follow: false },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}