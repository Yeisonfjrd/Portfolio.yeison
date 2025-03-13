"use client"

import { useEffect, useRef } from "react"

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

const HeroSection = ({
  title,
  subtitle,
  ctaText,
  ctaLink = "#",
  secondaryCtaText,
  secondaryCtaLink = "#",
}: HeroSectionProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!titleRef.current) return

    const letters = titleRef.current.innerText.split("")
    titleRef.current.innerHTML = ""

    letters.forEach((letter, i) => {
      const span = document.createElement("span")
      span.innerText = letter
      span.style.animationDelay = `${i * 0.05}s`
      span.classList.add("inline-block")

      if (letter !== " ") {
        span.classList.add("hover:text-violet-500", "dark:hover:text-violet-400", "transition-colors", "duration-300")
      }

      titleRef.current?.appendChild(span)
    })
  }, [])

  return (
    <div className="text-center py-16 md:py-24 lg:py-32">
      <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
        {title}
      </h1>

      <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">{subtitle}</p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {ctaText && (
          <a
            href={ctaLink}
            className="px-8 py-3 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            {ctaText}
          </a>
        )}

        {secondaryCtaText && (
          <a
            href={secondaryCtaLink}
            className="px-8 py-3 bg-transparent border border-violet-600 dark:border-violet-400 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            {secondaryCtaText}
          </a>
        )}
      </div>
    </div>
  )
}

export default HeroSection