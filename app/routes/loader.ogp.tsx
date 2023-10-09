import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"

export async function loader({ request }: LoaderFunctionArgs) {
  const path = new URL(request.url)
  const url = path.searchParams.get("url")

  if (!url) {
    return json({ data: null })
  }

  const res = await fetch(url)

  if (res.status !== 200) {
    return json("Not found OGP", { status: res.status })
  }

  const domString = await res.text()

  return json({ data: domString })
}
