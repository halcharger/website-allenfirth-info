import Head from 'next/head'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1 mt-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>
          Allen Firth - Full-stack software developer and architect
        </title>
        <meta
          name="description"
          content="I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Full-stack software developer and architect with a passion for building things.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos;m Allen Firth. I&apos;ve been developing applications for over two decades now. 
          </p>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I build with <strong>C#, Angular / React & Microsoft Azure</strong>.
          </p>
          <div className="mt-12 flex gap-6">
            <SocialLink
              href="https://github.com/halcharger"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/allenfirth"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <Button href="allenfirth-cv.pdf" variant="secondary" className="w-48">
              Download CV
              <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
            </Button>
          </div>

        </div>
      </Container>
    </>
  )
}
