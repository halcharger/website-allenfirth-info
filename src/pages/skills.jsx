import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'

export default function Skills() {
    return (
      <>
        <Head>
          <title>Skills - Allen Firth</title>
          <meta
            name="description"
            content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
          />
        </Head>
        <SimpleLayout
          title="Skills."
          intro="I’m a full-stack developer with expert level experience in databases, server-side business logic processing and client-side user interfaces."
        >
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="flex max-w-3xl flex-col space-y-16">
                <ul className='text-zinc-600 dark:text-zinc-400'>
                    <li>Microsoft Azure, DevOps, Apps  & Infra</li>
                    <li>C# / .NET Core / Asp.NET Core / SignalR</li>
                    <li>Angular / React / TypeScript / Javascript / NodeJS</li>
                    <li>Azure Sql Server / Azure Synapse / Azure CosmosDb / MongoDb</li>
                    <li>Git / GitHub / BitBucket</li>
                </ul>
            </div>
          </div>
        </SimpleLayout>
      </>
    )
  }
  