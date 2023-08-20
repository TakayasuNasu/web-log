import type { LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"

export async function loader({ request }: LoaderArgs) {
  const path = new URL(request.url)
  const url = path.searchParams.get("url")

  if (!url) {
    return json({ data: null })
  }

  const res = await fetch(url)

  if (res.status !== 200) {
    return json("Not found OGP", { status: res.status })
  }

  return json({ data: res })
}
