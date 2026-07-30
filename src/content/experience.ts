export type Role = {
  id: string
  company: string
  title: string
  start: string
  end: string | null
  location?: string
  employment?: string
  summary: string
  bullets: string[]
  stack: string[]
  links?: { label: string; href: string }[]
}

/** Roles newest-first. */
export const experience: Role[] = [
  {
    id: 'uniper-ppa-valuation',
    company: 'Uniper',
    title: 'Lead full-stack consultant — PPA Model Valuation Desktop',
    start: '2022-07',
    end: '2025-03',
    location: 'London, UK — remote',
    employment: 'via Digiterre',
    summary:
      'Led a full-stack team at Uniper building a system for Power Purchase Agreement valuation model inputs and timeseries visualisation for renewable energies.',
    bullets: [
      'Rewrote the application after the prior version failed to meet business requirements',
      'Improved performance of key functional areas by an order of magnitude',
      'Delivered input handling and analysis of model timeseries outputs for PPA valuation',
    ],
    stack: [
      'Angular',
      'TypeScript',
      'SignalR',
      'C#',
      'ASP.NET Core',
      'Azure Cosmos DB',
    ],
  },
  {
    id: 'corfinancial-bitarisk',
    company: 'corfinancial',
    title: 'Full-stack consultant — bitarisk REG9 compliance module',
    start: '2022-07',
    end: '2025-03',
    location: 'Remote',
    employment: 'via Digiterre',
    summary:
      'Built the REG9 compliance module for corfinancial’s bitarisk private client portfolio management system, leading UI and remote-team delivery.',
    bullets: [
      'Led enhancement of an existing Angular UI with new components integrated to backend services and APIs',
      'Delivered a robust, fully integrated REG9 compliance solution that elevated system functionality and UX',
      'Led a fully remote team through initiative and coordination under virtual-collaboration constraints',
    ],
    stack: ['Angular', 'TypeScript'],
    links: [
      {
        label: 'corfinancial bitarisk product information',
        href: 'https://www.corfinancialgroup.com/bita-risk-information/',
      },
    ],
  },
  {
    id: 'lseg-tm3',
    company: 'London Stock Exchange Group',
    title: 'Full-stack consultant — Municipal Market Monitor (TM3)',
    start: '2022-07',
    end: '2025-03',
    location: 'Remote',
    employment: 'via Digiterre',
    summary:
      'Redeveloped TM3, a fixed-income product giving clients access to US municipal bond information, for LSEG Workspace with multi-source integration and live trade streaming.',
    bullets: [
      'Integrated multiple disparate data sources and streamed live trade data via WebSockets',
      'Partnered closely with the business to land requirements inside LSEG’s technical estate',
      'Shipped multiple production releases enabling migration from the legacy product onto new TM3',
    ],
    stack: ['Web Components', 'TypeScript', 'WebSockets', 'Node.js', 'GraphQL'],
    links: [
      {
        label: 'Digiterre case study on LSEG TM3 project',
        href: 'https://www.digiterre.com/our-work/raising-the-quality-bar-on-data-service-provision-tools-for-fixed-income-clients/',
      },
    ],
  },
  {
    id: 'clifford-chance-partner-remuneration',
    company: 'Clifford Chance',
    title: 'Technical and architectural consultant — Partner Remuneration System',
    start: '2022-01',
    end: '2022-07',
    location: 'London, UK — remote',
    summary:
      'Provided technical and architectural guidance to upgrade a global partner remuneration system covering multiple tax regions and country-specific tax rules.',
    bullets: [
      'Guided technology upgrade of the existing partner remuneration platform',
      'Improved application performance while adopting industry best practices for code quality and design',
    ],
    stack: ['Angular', 'C#', 'ASP.NET Core', 'Azure SQL Server'],
  },
  {
    id: 'anglo-american-live-exposure',
    company: 'Anglo American',
    title: 'Full-stack consultant — Live Exposure Reporting Tool',
    start: '2021-07',
    end: '2021-12',
    location: 'London, UK — remote',
    employment: 'via Digiterre',
    summary:
      'Built intraday exposure reporting for traders with multi-dimensional filtering, pivoting, and drill-down from book and strategy to trade-level data.',
    bullets: [
      'Handled large multi-dimensional working datasets with regularly changing data',
      'Broadcast daily trades to the UI in real time with SignalR, including pause-and-snapshot investigation',
    ],
    stack: [
      'Angular',
      'TypeScript',
      'C#',
      'ASP.NET Core',
      'SignalR',
      'Azure SQL Synapse',
    ],
  },
  {
    id: 'spar-datalake-reporting',
    company: 'The SPAR Group',
    title: 'Consultant developer — DataLake and Reporting System',
    start: '2017',
    end: '2021',
    location: 'Durban, South Africa',
    employment: 'via CodeStream',
    summary:
      'Replicated operational data from disparate legacy stores into a modernised central data lake and exposed reporting APIs for business applications.',
    bullets: [
      'Sourced and replicated operational data into Azure SQL Server as a central data lake',
      'Built C# / ASP.NET Web API endpoints for reporting and data investigation',
      'Migrated the data lake toward Azure services including Data Factory and Synapse',
    ],
    stack: [
      'C#',
      'ASP.NET Web API',
      'Azure SQL Server',
      'Azure Data Factory',
      'Azure Synapse',
    ],
  },
  {
    id: 'spar-store-vendor-mdm',
    company: 'The SPAR Group',
    title: 'Consultant developer — Store & Vendor Master Data Systems',
    start: '2017',
    end: '2021',
    location: 'Durban, South Africa',
    employment: 'via CodeStream',
    summary:
      'Delivered highly distributed master-data applications spanning SAP, iSeries/AS400, and custom SQL Server stores with coordinated messaging and workflow.',
    bullets: [
      'Coordinated development teams and sprint work across system boundaries',
      'Built Angular UIs integrating with .NET and SAP APIs',
      'Used IBM Process Server and Integration Bus for messaging and workflow across backends',
    ],
    stack: [
      'Angular',
      '.NET',
      'SAP APIs',
      'IBM Process Server',
      'IBM Integration Bus',
      'SQL Server',
    ],
  },
  {
    id: 'various-other-contracts',
    company: 'Various clients',
    title: 'Consultant developer — selected engagements',
    start: '2017',
    end: '2021',
    location: 'Remote from Durban, South Africa',
    employment: 'via CodeStream',
    summary:
      'Remote consulting across vehicle micro-dotting OEM systems, live sports telemetry, customer coupon management, bookkeeping marketplaces, and ongoing SMEasy product work.',
    bullets: [
      'Built backend APIs for Veridot’s OEM micro-dotting system and migrated the solution to fully managed Azure hosting',
      'Processed live Chelsea FC player GPS, acceleration and speed data via Azure Event Hubs, Functions and SQL Server',
      'Built CashRewards’ customer coupon management site in Angular (Australia)',
      'Completed PROFiltr’s online marketplace for small bookkeeping companies (AngularJS, Node.js, MongoDB)',
      'Provided ongoing support and further development of SMEasy after the CTO tenure',
    ],
    stack: [
      'Azure',
      'Azure Event Hubs',
      'Azure Functions',
      'Azure SQL Server',
      'Angular',
      'AngularJS',
      'Node.js',
      'MongoDB',
    ],
  },
  {
    id: 'smeasy-cto',
    company: 'SMEasy',
    title: 'Chief Technical Officer',
    start: '2015',
    end: '2017',
    location: 'Durban, South Africa',
    summary:
      'CTO of an online accounting package for SMEs, covering product leadership, architecture, delivery, and board-level technical strategy.',
    bullets: [
      'Provided technical insight to the board for strategic decision-making',
      'Led product technical direction and further development of offerings',
      'Managed development resources and outside contractors',
      'Drove system architecture, process re-engineering, and new technology investment',
    ],
    stack: [],
  },
  {
    id: 'mandg-investments-consulting',
    company: 'M&G Investments',
    title: 'Consultant developer — agile practices and CI/CD coaching',
    start: '2011',
    end: '2015',
    location: 'London, UK',
    employment: 'via Digiterre',
    summary:
      'With four other Digiterre consultants, introduced agile practices, CI/CD, and automated testing while coaching M&G developers on industry patterns and design principles.',
    bullets: [
      'Embedded continuous integration and automated unit, integration and acceptance tests',
      'Automated application and database deployment across environments',
      'Coached and mentored M&G developers on patterns, practices and design principles',
    ],
    stack: [],
  },
  {
    id: 'edf-trading-mdm-margins',
    company: 'EDF Trading',
    title: 'Consultant developer — Master Data Management & Initial Margins',
    start: '2011',
    end: '2015',
    location: 'London, UK',
    employment: 'via Digiterre',
    summary:
      'On a small agile team of four, built a Master Data Management system and an Initial Margins tool reconciling EDF energy positions with clearing-house margins.',
    bullets: [
      'Wrapped a third-party calculation engine for daily automated initial-margin reporting',
      'Loaded input data from EDF systems daily and produced reconciliation reports for the business',
    ],
    stack: [],
  },
  {
    id: 'eon-pricing-tool',
    company: 'EON',
    title: 'Team lead — Transfer Pricing management tool',
    start: '2011',
    end: '2015',
    location: 'London, UK',
    employment: 'via Digiterre',
    summary:
      'Led a multi-site team (London, Düsseldorf, India) delivering a Transfer Pricing management tool for EON Energy Trading through to completion and handover.',
    bullets: [
      'Coordinated delivery across London, Düsseldorf and India with strong communication discipline',
      'Processed large model-output datasets through calculations and manipulation for business reports and analysis',
      'Handed the completed system to an outsourced support provider chosen by EON',
    ],
    stack: ['Oracle', 'WPF'],
  },
  {
    id: 'man-investments-middle-office',
    company: 'MAN Investments',
    title:
      'Developer — system integration, FX, fund accounting & fee calculation',
    start: '2010',
    end: '2011',
    location: 'London, UK',
    summary:
      'Worked in a geographically distributed middle-office team integrating disparate applications at a large fund-of-funds, spanning fund accounting, fee calculation, FX and trade planning.',
    bullets: [
      'Connected data sources and applications via request/response and pub/sub messaging (Oracle WebLogic, MSMQ, in-house bus)',
      'Ran month-long SCRUM sprints across distributed offices with strong communication focus',
      'Advanced Agile adoption, test coverage and TDD across the codebase',
    ],
    stack: ['Oracle WebLogic', 'MSMQ'],
  },
  {
    id: 'brit-insurance-policy-management',
    company: 'Brit Insurance',
    title: 'Developer — Online Policy Management System',
    start: '2009',
    end: '2010',
    location: 'London, UK',
    summary:
      'On a team of eight, built an online policy management system for insurance sold through Brit’s broker network, using loosely coupled messaging for high availability.',
    bullets: [
      'Implemented publish/subscribe decoupling with NServiceBus across logically separate components',
      'Worked with TeamCity CI, unit/integration tests and automated deployment for fast feedback',
      'Operated a self-managing Kanban-style team with shared system ownership',
    ],
    stack: ['NServiceBus', 'TeamCity'],
  },
  {
    id: 'freshfields-contact-event-management',
    company: 'Freshfields Bruckhaus Deringer',
    title: 'Developer — Contact & event management',
    start: '2008',
    end: '2009',
    location: 'London, UK',
    summary:
      'Built a contact and event management system for business contacts, targeted communications, and full life-cycle tracking of business events.',
    bullets: [
      'Delivered contact groupings and targeted event communications with life-cycle tracking',
      'Used ASP.NET MVC and jQuery for client-side asynchronous UI updates',
    ],
    stack: ['ASP.NET MVC', 'jQuery'],
  },
  {
    id: 'freshfields-budgeting-tool',
    company: 'Freshfields Bruckhaus Deringer',
    title: 'Developer — Budgeting Management Tool',
    start: '2008',
    end: '2009',
    location: 'London, UK',
    summary:
      'On a large team, built an internal budgeting application for matter cost monitoring across finance and firm work-management systems.',
    bullets: [
      'Budgeted estimated work costs for partners, fee-earners and other resources at different exchange rates',
      'Compared budgets against actual matter outcomes with monitoring reports',
    ],
    stack: [],
  },
]

export function getRecentRoles(limit = 3): Role[] {
  return experience.slice(0, limit)
}
