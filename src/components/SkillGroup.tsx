import type { SkillGroup as SkillGroupData } from '@/content'
import { Card } from './Card'
import { MetaChip } from './MetaChip'

export function SkillGroup({ group }: { group: SkillGroupData }) {
  return (
    <Card className="flex h-full flex-col gap-3">
      <h2 className="text-base font-semibold tracking-tight text-text">
        {group.layer}
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <MetaChip key={item}>{item}</MetaChip>
        ))}
      </div>
    </Card>
  )
}
