interface TimelineItemProps {
    date: string
    title: string
    company: string
    description: string
    isLast?: boolean
  }
  
  const TimelineItem = ({ date, title, company, description, isLast = false }: TimelineItemProps) => {
    return (
      <div className="relative pl-8 pb-8">
        {!isLast && <div className="absolute top-5 left-3 h-full w-0.5 bg-violet-200 dark:bg-violet-800/50"></div>}
  
        <div className="absolute top-5 left-0 w-6 h-6 rounded-full bg-violet-600 dark:bg-violet-500 border-4 border-white dark:border-slate-950 z-10"></div>
  
        <div className="pt-1">
          <span className="text-sm font-medium text-violet-600 dark:text-violet-400 block mb-1">{date}</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
          <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">{company}</h4>
          <p className="text-slate-600 dark:text-slate-400">{description}</p>
        </div>
      </div>
    )
  }
  
  interface ExperienceTimelineProps {
    experiences: Array<{
      date: string
      title: string
      company: string
      description: string
    }>
  }
  
  const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
    return (
      <div className="mt-8">
        {experiences.map((experience, index) => (
          <TimelineItem
            key={index}
            date={experience.date}
            title={experience.title}
            company={experience.company}
            description={experience.description}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    )
  }
  
  export default ExperienceTimeline  