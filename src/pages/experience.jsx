import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ExperienceSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Contract({ title, event: location, children }) {
  return (
    <Card as="article">
      <Card.Title as="h3">{title}</Card.Title>
      <Card.Eyebrow decorate>{location}</Card.Eyebrow>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Experience() {
  return (
    <>
      <Head>
        <title>Experience - Allen Firth</title>
        <meta
          name="description"
          content="I have over 20 years of experience in software development."
        />
      </Head>
      <SimpleLayout
        title="Experience."
        intro="With over 20 years of experience I have a lot to offer."
      >
        <div className="space-y-20">
          <ExperienceSection title="Jul 2024 - Current | Digiterre Consultant Developer">
            <Contract
              title="corfinancial - bitarisk - private client portfolio management"
              event="London, UK - Fully Remote"
            >
              <p>
                As a <strong>Digiterre</strong> consultant I worked on a team
                responsible for building out the new REG9 compliance module of
                corfinancials <strong>bitarisk</strong> private client portfolio
                management system.
              </p>
              <p className="mt-2">
                I Led the enhancement of an existing Angular-based user
                interface by developing new components and integrating them
                seamlessly with backend services and APIs. This project demanded
                a strong blend of front-end expertise and backend coordination,
                resulting in a robust, fully integrated solution that elevated
                system functionality and user experience.
              </p>
              <p className="mt-2">
                I led the fully remote team in taking initiative to develop
                effective solutions, ensuring alignment with project goals
                despite the challenges of virtual collaboration. This role
                underscored my ability to lead, coordinate, and deliver
                successful outcomes in a dynamic, remote work environment.
              </p>
              <p className="mt-2 font-semibold">Angular, TypeScript</p>
              <p className="mt-2">
                <a
                  href="https://www.corfinancialgroup.com/bita-risk-information/"
                  target="_blank"
                  rel="noreferrer"
                >
                  corfinancial bitarisk product information.
                </a>
              </p>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="Jun 2023 - Jul 2024 | Digiterre Consultant Developer">
            <Contract
              title="London Stock Exchange Group - Municipal Market Monitor"
              event="London, UK - Fully Remote"
            >
              <p>
                As a <strong>Digiterre</strong> consultant I worked on a team
                responsible for redeveloping the{' '}
                <strong>Municipal Market Monitor</strong> application (TM3) at
                the <strong>London Stock Exchange Group</strong> (LSEG).
              </p>
              <p className="mt-2">
                <strong>TM3</strong> is a fixed income product that provides
                customers access to information about United States Municipal
                bonds. The application was redeveloped for{' '}
                <strong>LSEG&apos;s</strong> Workspace platform and integrated
                with multiple disparate data sources as well as also streaming
                live trade data to clients using websocket connections.
              </p>
              <p className="mt-2">
                The project required a high degree of customer focus and
                communication in order to bring together the business
                requirements inside of <strong>LSEG&apos;s</strong> technical
                estate. The team and I have successfully delivered multiple
                production releases of the product to-date enabling{' '}
                <strong>LSEG</strong> to start migrating their customers from
                the legacy product onto the new TM3 application.
              </p>
              <p className="mt-2 font-semibold">
                Web Components, TypeScript, WebSockets, Nodejs, GraphQL
              </p>
              <p className="mt-2">
                <a
                  href="https://www.digiterre.com/our-work/raising-the-quality-bar-on-data-service-provision-tools-for-fixed-income-clients/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Digiterre case study on LSEG TM3 project
                </a>
              </p>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="Jul 2022 - May 2023 | Digiterre Consultant Developer">
            <Contract
              title="Uniper - PPA Model Valuation Desktop"
              event="Germany - Fully Remote"
            >
              <p>
                As a <strong>Digiterre</strong> consultant I lead a team as a
                full-stack developer on a project at <strong>Uniper</strong>{' '}
                aimed at creating a system to handle the inputs necessary for
                operating <strong>Unipers</strong> Power Price Agreement
                valuation models related to renewable energies. This system also
                involves visualizing and analysing the timeseries outputs
                generated by these models.
              </p>
              <p className="mt-2">
                Our team was assigned the responsibility of re-writing the
                system as the prior version of the application was unable to
                meet the business requirements. Our team successfully
                accomplished this mandate and made significant improvements in
                the performance of the key functional areas of the application,
                enhancing performance by an order of magnitude.
              </p>
              <p className="mt-2 font-semibold">
                Angular, TypeScript, SignalR, C#, Asp.NET Core, Azure CosmosDb
              </p>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="Jan 2022 - Jul 2022">
            <Contract
              title="Clifford Chance - Partner Remuneration System"
              event="London, UK - Fully Remote"
            >
              <p>
                I was brought in to <strong>Clifford Chance</strong> to offer
                technical and architectural guidance and input to an existing
                team of developers. Our primary objective was to upgrade the
                technology of an existing <strong>Partner system</strong> that
                was utilized for managing global partner remuneration in various
                tax regions taking into consideration many different country
                specific tax rules.
              </p>
              <p className="mt-2">
                As a team, we improved the performance of the application while
                also incorporating industry best practices to enhance the code
                quality and design.
              </p>
              <p className="mt-2 font-semibold">
                Angular, C#, Asp.NET Core, Azure SQL Server
              </p>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="Jul 2021 - Nov 2021 | Digiterre Consultant Developer">
            <Contract
              title="Anglo American - Live Exposure Reporting Tool"
              event="London, UK - Fully Remote"
            >
              <p>
                As a <strong>Digiterre</strong> consultant I filled the role of
                full-stack deveoper on a team building intraday reporting
                functionality for traders at <strong>Anglo American</strong>.
                Traders could use the tool to access exposure data and it was
                created to facilitate filtering by date, pivoting, and delving
                into book, strategy, and trade-level data.
              </p>
              <p className="mt-2">
                The complexity of the project lay in managing large working
                datasets that contained multiple reporting dimensions, and
                handling regularly changing data. Daily trades were broadcast to
                the user interface in real-time using SignalR, and traders had
                the choice to pause the feed and investigate the data as a
                snapshot in time.
              </p>
              <p className="mt-2 font-semibold">
                Angular, TypeScript, C#, Asp.NET Core, SignalR and Azure SQL
                Synapse
              </p>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="2017 - 2021 | CodeStream Consultant Developer">
            <Contract
              title="The SPAR Group - DataLake and Reporting System"
              event="Durban, South Africa"
            >
              <p>
                This project involved various disparate legacy data storage
                systems from which operational data was sourced and replicated
                into a central modernized data lake using{' '}
                <strong>Azure SQL Server</strong>. In addition, API endpoints
                were built using <strong>C#</strong> and{' '}
                <strong>Asp.Net WebApi</strong> to provide a reporting and data
                investigation capability to business on top of which rich and
                useful applications can be built by the business. The DataLake
                is now being migrated to <strong>Azure</strong> to leverage
                various cloud platform technologies and services such as{' '}
                <strong>Azure Data Factory</strong> and{' '}
                <strong>Azure Synaspe</strong>.
              </p>
            </Contract>
            <Contract
              title="The SPAR Group - Store & Vendor Master Data Systems"
              event="Durban, South Africa"
            >
              <p>
                These master data applications are highly distributed across
                multiple core backend enterprise systems such as SAP,
                iSeries/AS400 and custom SQL Server databases. Technologies such
                as IBM Process Server & Integration Bus are used to co-ordinate
                messaging and workflow across the various backend system
                boundaries. The user interface was developed using{' '}
                <span className="font-semibold">Angular</span> and integrates
                directly with numerous{' '}
                <span className="font-semibold">.NET & SAP Api’s</span>. I
                played an integral role in co-ordinating the various development
                teams and managing sprint work as well as development of the
                user interfaces and .NET Api’s.
              </p>
            </Contract>
            <Contract
              title="Various Other Contracts"
              event="Fully remote from Durban, South Africa"
            >
              <p>
                I&apos;ve built the Back-End API&apos;s for{' '}
                <span className="font-semibold">Veridot&apos;s</span> OEM
                system, enabling them to move from their legacy system to a new
                highly functional system for tracking the Micro-dotting of
                vehicles in South Africa. I also managed the migration of the
                solution to <span className="font-semibold">Azure</span> proving{' '}
                <span className="font-semibold">Veridot</span> with a fully
                managed Azure hosted solution.
              </p>
              <p className="mt-2">
                I&apos;ve worked <span className="font-semibold">remotely</span>{' '}
                on a live data processing system for{' '}
                <span className="font-semibold">Chelsea Football Club</span> in
                the <span className="font-semibold">UK</span>, recieving,
                analyzing and processing player GPS, acceleration and speed data
                being fed live into an Azure processing pipeline using{' '}
                <span className="font-semibold">
                  Azure EventHub, Azure Functions and Azure Sql Server
                </span>
                .
              </p>
              <p className="mt-2">
                I&apos;ve worked <span className="font-semibold">remotely</span>{' '}
                for <span className="font-semibold">CashRewards</span> in{' '}
                <span className="font-semibold">Australia</span> building their
                new Customer Coupon Management site using{' '}
                <span className="font-semibold">Angular</span>.
              </p>
              <p className="mt-2">
                I&apos;ve worked <span className="font-semibold">remotely</span>{' '}
                for a <span className="font-semibold">PROFiltr</span> in the{' '}
                <span className="font-semibold">UK</span> bringing their online
                solution for small bookkeeping companies together with potential
                clients to completion using{' '}
                <span className="font-semibold">
                  AngualrJS, NodeJS and MongoDB
                </span>
              </p>
              <p className="mt-2">
                I&apos;ve provided ongoing support and further development of{' '}
                <span className="font-semibold">SMEasy</span> (see previous
                poisition as CTO at SMEasy)
              </p>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="2015 - 2017">
            <Contract
              title="SMEasy - Chief Technical Officer"
              event="Durban, South Africa"
            >
              <p>
                I worked as CTO of SMEasy, coordinating and managing all
                technical aspects of this exciting online accounting package
                startup for small to medium sized enterprises. My role was
                multi-faceted and included the following:
              </p>
              <ul className="mt-2 list-disc">
                <li>
                  Providing key technical insight to the SMEasy board in order
                  to aid them in strategic decision making.
                </li>
                <li>
                  Overall technical leadership and guidance of the SMEasy
                  product
                </li>
                <li>Further development of product offerings</li>
                <li>
                  Managing and leading development resources and outside
                  contractors
                </li>
                <li>System architecture and development</li>
                <li>Process re-engineering &amp; new technology investment</li>
              </ul>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="2011 - 2015 Consultant Developer @ Digiterre">
            <Contract title="M & G Investments - Consulting" event="London, UK">
              <p>
                I worked with four other Digiterre consultants at M &amp; G
                Investments. Our mandate was to introduce agile practices into
                the development team at M &amp; G. We incorporated Continuous
                integration into the development cycle, automated unit,
                integration and acceptance tests as well as automated
                application deployment and database deployment in all
                environments. We were also responsible for working closely with
                M &amp; G developers in a coaching and mentoring capacity to
                teach new skills and impart accepted industry patterns and
                practices and design principles.
              </p>
            </Contract>
            <Contract
              title="EDF Trading - Master Data Management"
              event="London, UK"
            >
              <p>
                I worked on a small team of four developers in a highly agile
                fashion developing a small Master Data Management system and an
                Initial Margins tool used to calculate initial margins on all
                EDF Trading energy positions which would then be reconciled with
                the initial margin positions as specified by the clearing
                houses. The application wrapped a third party tool which
                performed the calculations and facilitated an automated process
                whereby input data from EDF systems was loaded on a daily basis
                and initial margin reports were automatically generated for the
                business to reconcile.
              </p>
            </Contract>
            <Contract title="EON - Pricing Tool" event="London, UK">
              <p>
                I worked primarily as the team lead on a large project for an
                EON Energy Trading developing a Transfer Pricing management
                tool. The project team was spread over London, Dusseldorf and
                India and required strong coordination and communication to keep
                the project on track. In the last two years we have brought this
                project to completion and are now in the process of handing it
                over for support and maintenance to an outsourced provider
                chosen by the EON.
              </p>
              <p clas="mt-2">
                The solution we provided made use of Oracle, server side service
                components and a WPF user interface. The system worked on large
                sets of data output by models and involved a series of
                calculations and data manipulation in order to output the
                required reports and data analysis required by the business.
              </p>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="2010 - 2011">
            <Contract
              title="MAN Investments - System Integration / Fx / Fund Accounting / Fee Calculation"
              event="London, UK"
            >
              <p>
                I worked in a geographically distributed team on systems
                integration of multiple disparate applications in the middle
                office of the worlds largest Fund of funds. The development team
                facilitated systems communication between various data sources
                and applications using a variety of request/response and
                publish/subscribe messaging solutions built on Oracle weblogic /
                MSMQ and a custom in-house message bus.
              </p>
              <p className="mt-2">
                The team used SCRUM to run and manage month long sprints. SCRUM
                teams were located in different offices and communication was
                paramount to successfully completing work. Part of the teams
                mandate was to introduce in increasing measures the principles
                of Agile development, increase the test coverage of the code
                base and strongly push the ethos of TDD.
              </p>
              <p className="mt-2">
                I have worked on various different systems including middle
                office fund accounting, Fee calculation, Foreign Exchange and
                Trade planning.
              </p>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="2009 - 2010">
            <Contract
              title="Brit Insurance - Online Policy Management System"
              event="London, UK"
            >
              <p>
                I worked on a team of eight developing an online policy
                management system enabling BritInsurance to manage insurance
                sold through their network of brokers. The system was loosely
                coupled employing a publish/subscribe messaging model
                implemented with NServiceBus to achieve decoupling of logically
                separate components, high availability and reduce dependencies
                on other systems.
              </p>
              <p className="mt-2">
                The team worked in an agile fashion using a continuous
                integration environment (Team City) alongside unit and
                integration testing and automated deployment to provide timely
                feedback to developers on the health of the codebase as a whole.
                A Kanban board was used to monitor and manage the project’s
                progress and the team operated in a self-managing style with
                emphasis on distribution of system knowledge among the whole
                team and each member taking responsibility for the whole system.
              </p>
            </Contract>
          </ExperienceSection>
          <ExperienceSection title="2008 - 2009">
            <Contract
              title="Freshfields Bruckhaus Derringer - Contact &amp; event management"
              event="London, UK"
            >
              <p>
                I worked on a team developing a contact and event management
                system for the management of business contacts and targeted
                communications with specific groupings of contacts about
                business events and full life-cycle tracking of those events.
                The application was developed using ASP.NET MVC and jQuery for
                client-side asynchronous UI updates.
              </p>
            </Contract>
            <Contract
              title="Freshfields Bruckhaus Derringer - Budgeting Management Tool"
              event="London, UK"
            >
              <p>
                I worked as part of large team developing a budgeting
                application for the firms internal budgeting and cost monitoring
                of matters. The application was a web based tool relying on data
                from disparate systems from finance to firm control work
                management systems. Users of the system would budget costs of
                estimated work catering for different partners, fee-earners and
                other resources at different exchange rates. The budget was then
                eventually compared against actual outcomes of work done on a
                matter and various reports were available to help monitor the
                progress of a budget.
              </p>
            </Contract>
          </ExperienceSection>
        </div>
        <p className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
          Older experience available on request.
        </p>
      </SimpleLayout>
    </>
  )
}
