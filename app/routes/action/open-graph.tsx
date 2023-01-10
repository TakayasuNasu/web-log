import type { ActionArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { getOgpData } from "~/models/open-graph.server"

export const action = async ({ request }: ActionArgs) => {
  const data = await request.formData()

  const url = data.get("url") as string | null

  if (!url) throw new Error("url is a required parameter")

  const openGraphData = await getOgpData(url)

  return json({ success: true, openGraphData: openGraphData })
}

export const loader = async () => redirect("/", { status: 404 })
