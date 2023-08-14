import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { createSitemapGenerator } from "remix-sitemap";

const { isSitemapUrl, sitemap } = createSitemapGenerator({
  siteUrl: "https://weblog.i-nasu.com",
  generateRobotsTxt: true
})

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  if (isSitemapUrl(request)) {
    return await sitemap(request, remixContext)
  }

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
