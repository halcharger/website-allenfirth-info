export type SkillGroup = { layer: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  {
    layer: 'Cloud',
    items: [
      'Microsoft Azure',
      'Azure DevOps',
      'Functions',
      'Event Hubs',
      'Data Factory',
    ],
  },
  {
    layer: 'Backend',
    items: ['C# / .NET', 'ASP.NET Core', 'SignalR', 'Node.js', 'GraphQL'],
  },
  {
    layer: 'Frontend',
    items: ['Angular', 'React', 'TypeScript', 'Web Components'],
  },
  {
    layer: 'Data',
    items: ['Azure SQL', 'Azure Synapse', 'Azure Cosmos DB', 'MongoDB'],
  },
  {
    layer: 'Practice',
    items: [
      'TDD',
      'CI/CD',
      'Microservices',
      'Docker / Kubernetes',
      'Code review',
    ],
  },
]
