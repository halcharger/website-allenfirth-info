import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'

export default function Contact() {
    return (
      <>
        <Head>
          <title>Contact - Allen Firth</title>
          <meta
            name="description"
            content="Get hold of me."
          />
        </Head>
        <SimpleLayout
          title="Contact Me."
          intro=""
        >
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                Email me on allen @ codestream.co.za
            </p>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                Call me on +27 (0)60 840 7793
            </p>

        </SimpleLayout>
      </>
    )
  }
  