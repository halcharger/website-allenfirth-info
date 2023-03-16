import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Allen Firth</title>
        <meta
          name="description"
          content="I’m Allen Firth. I live in Durban, South Africa."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I’m Allen Firth.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>I am an experienced full-stack software developer and architect. I studied correspondence through the University of South Africa
              whilst at the same time working at a small software development consultancy based in Durban. In <strong>2004</strong> I obtained my <strong>Bachelors Degree in Informatics</strong>.</p>
              <p>I spent six and a half years expanding my technical horizons in <strong>London</strong>, working for some of the <strong>United Kingdoms</strong> premier corporations in <span class="underline-text">Law, Insurance and Finance</span>.</p>

              <p>Today I have <strong>two decades</strong> worth of <em>in the trenches</em> software development experience with a broad exposure to different industries and software development methodologies.</p>

              <p>I now run my own software development consultancy <a href="https://www.codestream.co.za">CodeStream</a>.</p>

              <p>The core principles of my software development philosophy are <strong>simplicity</strong>, <strong>testing</strong> and <strong>automation</strong>.</p>

              <blockquote>
                <p>Keep it simple, Test everything, Automate always</p>
              </blockquote>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="https://github.com/halcharger" icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/allenfirth" icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <li className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 text-sm font-medium text-zinc-800 dark:text-zinc-200 dark:hover:text-teal-500">Email me on allen @ codestream.co.za</li>
              <li className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-200 dark:hover:text-teal-500">Call me on +27 (0)60 840 7793</li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
