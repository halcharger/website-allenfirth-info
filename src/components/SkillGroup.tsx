import type { SkillGroup as SkillGroupData } from '@/content'
import { MetaChip } from './MetaChip'

export function SkillGroup({ group }: { group: SkillGroupData }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold tracking-tight text-text">
        {group.layer}
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <MetaChip key={item}>{item}</MetaChip>
        ))}
      </div>
    </div>
  )
}
