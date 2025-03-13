import type React from "react"
interface SkillBadgeProps {
  name: string
  icon?: React.ReactNode
  level?: number
}

const SkillBadge = ({ name, icon, level = 0 }: SkillBadgeProps) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {icon && <div className="text-violet-600 dark:text-violet-400 mb-2">{icon}</div>}
      <span className="font-medium text-slate-800 dark:text-slate-200">{name}</span>

      {level > 0 && (
        <div className="w-full mt-2 bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
          <div
            className="bg-violet-600 dark:bg-violet-400 h-1.5 rounded-full"
            style={{ width: `${Math.min(level * 20, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  )
}

export default SkillBadge