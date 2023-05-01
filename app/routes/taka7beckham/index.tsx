import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

// icon
import { TfiLocationPin } from "react-icons/tfi"
import { AiOutlineLink } from "react-icons/ai"

// models
import { client } from "~/models/contentful.server"

// assets
import about from "~/images/bg-about.jpg"
import face from "~/images/face.webp"

export const loader = async () => {
  return json({
    masta: await client.getSiteMasta(),
  })
}

export default function About() {
  const { masta } = useLoaderData<typeof loader>()
  return (
    <section data-about>
      <figure
        className="hero"
        style={{ backgroundImage: `url(${about})` }}
      ></figure>

      <section className="outline">
        <figure className="face">
          <img src={face} alt="face" />
        </figure>

        <h2>{masta.nickname}</h2>

        <aside className="email">
          <span>{masta.email}</span>
        </aside>

        <p className="intro">{masta.introduction}</p>

        <aside className="list-wrapper">
          <ul className="list">
            <li>
              <TfiLocationPin /> {masta.address}
            </li>
            <li>
              <AiOutlineLink />{" "}
              <a href={`https://${masta.domain}`}>{masta.domain}</a>
            </li>
          </ul>
        </aside>
      </section>
    </section>
  )
}
