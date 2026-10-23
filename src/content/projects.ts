export type ProjectItem = {
  slug: string
  title: string
  year: string
  publisher: string
  website?: { label: string; href: string }
  summary: string
  stack: string[]
  order: number
  sections: { heading: string; body: string }[]
}

/** End-to-end systems. Not engagements, and not part of the experience timeline. */
export const projects: ProjectItem[] = [
  {
    slug: 'cosplay-platform',
    title: 'Cosplay Platform',
    year: '2024–2025',
    publisher: 'CodeStream',
    summary:
      'A social platform for cosplayers: profiles with photos and contest history, contest entry, on-platform judging, and results, for competitions at large fan conventions.',
    stack: [
      'Flutter',
      'C#',
      'ASP.NET Core',
      'Azure Cosmos DB',
      'Azure DevOps',
      'Docker',
    ],
    order: 2,
    sections: [
      {
        heading: 'Context',
        body: 'A social platform for the cosplay market, built for competitions at large fan conventions such as Comic Con. It covers running, managing, and judging a contest as well as the contestant’s presence on the platform.',
      },
      {
        heading: 'Approach',
        body: 'The client is a Flutter application for Android and iOS. A C# / ASP.NET Core API sits behind it, with Azure Cosmos DB as the datastore, hosted on Azure. Distinct components of the application communicate through messaging, and data records are eventually consistent. Azure DevOps ran the CI/CD pipeline, from unit tests through integration tests, with Docker in the delivery setup.',
      },
      {
        heading: 'Outcome',
        body: 'A contestant could set up a profile with photos and contest history, enter a contest, be judged on the platform, and view the results there. The competition workflow — entry, running, managing, judging, and results — lived on the same platform.',
      },
    ],
  },
  {
    slug: 'contractorpro',
    title: 'ContractorPro',
    year: '2024–2025',
    publisher: 'CodeStream',
    website: {
      label: 'contractorpro.app',
      href: 'https://contractorpro.app/',
    },
    summary:
      'A platform for South African contractors and home customers. Leads, quotes, job cards, and invoices in one application, with customers finding a contractor by trade and location.',
    stack: [
      'React Native',
      'C#',
      'ASP.NET Core',
      'Marten',
      'Wolverine',
      'PostgreSQL',
      'Azure Service Bus',
      'Azure',
      'Docker',
    ],
    order: 1,
    sections: [
      {
        heading: 'Context',
        body: 'ContractorPro is a platform for contractors and home customers in South Africa. Contractors run a job from the first enquiry through quoting, the work itself, and the invoice. Customers find a contractor by trade and location, describe the problem through a guided diagnostic, and follow quotes and completed work.',
      },
      {
        heading: 'Approach',
        body: 'The client is a React Native application for Android and iOS. A C# / ASP.NET Core API sits behind it, hosted on Azure. Marten stores event-sourced documents in PostgreSQL. Wolverine manages messaging between components over Azure Service Bus, in an event-driven design. Unit and integration tests run locally in Docker. GitHub Actions ran the CI/CD pipeline.',
      },
      {
        heading: 'Outcome',
        body: 'A contractor can capture a qualified lead, send a quote, document the job with photos, collect customer approval, and invoice from the same application. A customer can find a contractor, submit the problem, and review the quote and the finished work.',
      },
    ],
  },
  {
    slug: 'carwashpro',
    title: 'CarwashPro',
    year: '2026',
    publisher: 'CodeStream',
    summary:
      'A mobile web application for small carwash businesses. Each car is scanned in from its licence disc and tracked from the queue through the wash to collection, with a text message at the key stages.',
    stack: [
      'React',
      'C#',
      'ASP.NET Core',
      'Marten',
      'Wolverine',
      'PostgreSQL',
      'Supabase',
      'Docker',
      'GitHub Actions',
    ],
    order: 0,
    sections: [
      {
        heading: 'Context',
        body: 'CarwashPro is a browser application for small carwash businesses. Staff scan a car’s licence disc to bring it into the system, then track it as it is queued, as the wash starts, as the wash is completed, and as the customer collects it.',
      },
      {
        heading: 'Approach',
        body: 'The client is a React web application, designed for a mobile screen. A C# / ASP.NET Core API sits behind it. Marten stores the documents in PostgreSQL on Supabase. Wolverine manages asynchronous messaging between components. Unit and integration tests run locally in Docker. GitHub Actions runs the CI/CD pipeline.',
      },
      {
        heading: 'Outcome',
        body: 'The business gets a live view of the current queue and analytical data on wash volume. The customer gets a text message when the stage changes, including when the car is ready for collection, so they can leave and come back.',
      },
    ],
  },
  {
    slug: 'digitaltwin',
    title: 'DigitalTwin',
    year: '2022',
    publisher: 'DigitalTwin',
    summary:
      'Tracked tagged assets in real time with Bluetooth Low Energy tags, fixed gateways, and SignalR location updates. Live inventory, missing-asset alerts, and mobile inventory scans on a multi-tenant platform.',
    stack: [
      'ASP.NET Core 5',
      'SignalR',
      'SQL Server',
      'Azure',
      'Angular',
      'Xamarin',
      'Azure Functions',
      'MediatR',
      'Azure AD B2C',
    ],
    order: -1,
    sections: [
      {
        heading: 'Context',
        body: 'Co-founded DigitalTwin and led it as architect and lead developer. The platform tracked tagged assets in real time using Bluetooth Low Energy tags and fixed gateways, with live inventory, missing-asset alerts, and mobile inventory scans.',
      },
      {
        heading: 'Approach',
        body: 'Designed as a multi-tenant system on ASP.NET Core 5, SQL Server, and Azure. Ingest, tenant, reporting, and management APIs followed a CQRS design built with MediatR, with separate read and write models, audit trails, and pre-aggregated reporting. Azure Functions handled messaging and PDF generation. SignalR pushed live updates of asset locations and tracking. The web consoles were Angular, the mobile app was Xamarin, and sign-in used Azure AD B2C.',
      },
      {
        heading: 'Outcome',
        body: 'A partner productised it as a retail trolley-management system and acquired the platform in 2022. Led the full technical handover: an architecture and code walkthrough, followed by transferring the source control, the Azure subscription, the pipelines, the mobile app and DNS.',
      },
    ],
  },
]

export function getAllProjects(): ProjectItem[] {
  return [...projects].sort((a, b) => b.order - a.order)
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((project) => project.slug === slug)
}
