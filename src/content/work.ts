export type WorkItem = {
  slug: string
  title: string
  client: string
  clientType?: string
  year: string
  role: string
  outcome: string
  stack: string[]
  metrics?: { label: string; value: string }[]
  featured?: boolean
  order: number
  sections: { heading: string; body: string }[]
}

/** Selected case studies — NDA-safe public summaries only. */
export const work: WorkItem[] = [
  {
    slug: 'uniper-valuation-desktop',
    title: 'PPA Model Valuation Desktop',
    client: 'Uniper',
    clientType: 'Energy trading',
    year: '2022–2025',
    role: 'Lead full-stack consultant',
    outcome:
      'Rebuilt a failed PPA valuation workspace so traders and analysts could manage model inputs and inspect renewable timeseries with order-of-magnitude faster critical paths.',
    stack: [
      'Angular',
      'TypeScript',
      'SignalR',
      'C#',
      'ASP.NET Core',
      'Azure Cosmos DB',
    ],
    metrics: [
      { label: 'Critical-path performance', value: '~10× faster' },
      { label: 'Delivery model', value: 'Full rewrite' },
      { label: 'Engagement', value: 'Lead of full-stack team' },
    ],
    featured: true,
    order: 40,
    sections: [
      {
        heading: 'Context',
        body: 'Uniper needed a reliable desktop for Power Purchase Agreement valuation: model inputs, timeseries outputs, and visualisation for renewable energy deals. An earlier version of the application had failed to meet business requirements, so the engagement was a full rewrite rather than incremental polish.',
      },
      {
        heading: 'Approach',
        body: 'Led a full-stack team building an Angular and TypeScript front end over C# / ASP.NET Core services, with SignalR for live updates and Azure Cosmos DB for document-oriented model data. Focused on input handling, timeseries analysis surfaces, and rewriting the critical paths that had made the previous product unusable.',
      },
      {
        heading: 'Outcome',
        body: 'Delivered a production valuation workspace that met business requirements for PPA model inputs and timeseries review. Key functional areas improved by roughly an order of magnitude on critical paths, restoring confidence in the tooling for renewable valuation workflows.',
      },
    ],
  },
  {
    slug: 'lseg-tm3',
    title: 'Municipal Market Monitor (TM3)',
    client: 'London Stock Exchange Group',
    clientType: 'Financial markets',
    year: '2022–2025',
    role: 'Full-stack consultant',
    outcome:
      'Redeveloped TM3 for LSEG Workspace with multi-source integration and live trade streaming, enabling migration off the legacy product through multiple production releases.',
    stack: [
      'Web Components',
      'TypeScript',
      'WebSockets',
      'Node.js',
      'GraphQL',
    ],
    metrics: [
      { label: 'Live data', value: 'WebSocket trade streaming' },
      { label: 'Integration', value: 'Multi-source fixed-income data' },
      { label: 'Delivery', value: 'Multiple production releases' },
    ],
    featured: true,
    order: 30,
    sections: [
      {
        heading: 'Context',
        body: 'TM3 is a fixed-income product giving clients access to US municipal bond information. LSEG needed it redeveloped for Workspace so clients could leave the legacy experience without losing market depth or operational continuity.',
      },
      {
        heading: 'Approach',
        body: 'Built with Web Components and TypeScript, integrating multiple disparate data sources and streaming live trade data over WebSockets, with Node.js and GraphQL in the service layer. Partnered closely with the business to land requirements inside LSEG’s technical estate rather than forcing a greenfield stack.',
      },
      {
        heading: 'Outcome',
        body: 'Shipped multiple production releases that enabled migration from the legacy TM3 product onto the new Workspace experience, raising the quality bar for fixed-income data tools used by LSEG clients.',
      },
    ],
  },
  {
    slug: 'spar-datalake',
    title: 'DataLake and Reporting Platform',
    client: 'The SPAR Group',
    clientType: 'Retail',
    year: '2017–2021',
    role: 'Consultant developer',
    outcome:
      'Centralised operational data from disparate legacy stores into a modern Azure data lake and exposed reporting APIs for business applications and investigation.',
    stack: [
      'C#',
      'ASP.NET Web API',
      'Azure SQL Server',
      'Azure Data Factory',
      'Azure Synapse',
    ],
    metrics: [
      { label: 'Sources', value: 'Multiple legacy operational stores' },
      { label: 'Platform', value: 'Azure SQL → Data Factory & Synapse' },
      { label: 'Consumers', value: 'Reporting APIs for business apps' },
    ],
    featured: true,
    order: 20,
    sections: [
      {
        heading: 'Context',
        body: 'SPAR’s operational data lived across disparate legacy systems, which made consistent reporting and investigation difficult. The business needed a modernised central store and APIs that application teams could rely on without coupling to every source system.',
      },
      {
        heading: 'Approach',
        body: 'Replicated operational data into Azure SQL Server as a central data lake, built C# / ASP.NET Web API endpoints for reporting and data investigation, and progressively moved pipelines toward Azure Data Factory and Synapse as the platform matured.',
      },
      {
        heading: 'Outcome',
        body: 'Delivered a centralised lake and reporting surface that business applications could query through stable APIs, reducing dependence on brittle point-to-point access to legacy stores and setting up a path onto broader Azure data services.',
      },
    ],
  },
  {
    slug: 'anglo-live-exposure',
    title: 'Live Exposure Reporting Tool',
    client: 'Anglo American',
    clientType: 'Commodities trading',
    year: '2021',
    role: 'Full-stack consultant',
    outcome:
      'Built intraday exposure reporting with multi-dimensional filtering and real-time trade broadcast so traders could drill from book and strategy to trade-level detail.',
    stack: [
      'Angular',
      'TypeScript',
      'C#',
      'ASP.NET Core',
      'SignalR',
      'Azure SQL Synapse',
    ],
    metrics: [
      { label: 'Latency model', value: 'Intraday / real-time broadcast' },
      { label: 'Drill-down', value: 'Book → strategy → trade' },
      { label: 'Data shape', value: 'Large multi-dimensional sets' },
    ],
    featured: true,
    order: 10,
    sections: [
      {
        heading: 'Context',
        body: 'Traders needed intraday visibility into exposure with multi-dimensional filtering, pivoting, and drill-down from book and strategy down to individual trades, on working datasets that changed throughout the day.',
      },
      {
        heading: 'Approach',
        body: 'Delivered an Angular front end over C# / ASP.NET Core services, broadcasting daily trades to the UI in real time with SignalR—including pause-and-snapshot flows for investigation—and backing analysis with Azure SQL Synapse for large multi-dimensional working sets.',
      },
      {
        heading: 'Outcome',
        body: 'Gave traders a live exposure surface that stayed responsive under regularly changing data, with structured drill-down from aggregate views to trade-level detail without leaving the tool.',
      },
    ],
  },
]

export function getAllWork(): WorkItem[] {
  return [...work].sort((a, b) => b.order - a.order)
}

export function getFeaturedWork(limit = 3): WorkItem[] {
  return getAllWork()
    .filter((w) => w.featured !== false)
    .slice(0, limit)
}

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return work.find((w) => w.slug === slug)
}
