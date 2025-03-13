"use client"

import { useEffect, useRef } from "react"

const SimpleGalaxyAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = canvas.clientWidth
    let height = canvas.clientHeight

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const stars: { x: number; y: number; size: number; brightness: number; speed: number }[] = []
    const numStars = 300

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.05 + 0.01,
      })
    }

    const planets = [
      {
        x: width * 0.2,
        y: height * 0.3,
        radius: 8,
        color: "#ff6b6b",
        speed: 0.2,
        angle: 0,
        distance: 0,
      },
      {
        x: width * 0.8,
        y: height * 0.7,
        radius: 12,
        color: "#4dabf7",
        speed: 0.15,
        angle: Math.PI,
        distance: 0,
      },
      {
        x: width * 0.5,
        y: height * 0.2,
        radius: 6,
        color: "#ffd43b",
        speed: 0.25,
        angle: Math.PI / 2,
        distance: 0,
      },
      {
        x: width * 0.7,
        y: height * 0.4,
        radius: 10,
        color: "#8b5cf6",
        speed: 0.1,
        angle: Math.PI * 1.5,
        distance: 0,
      },
    ]

    const drawStars = () => {
      if (!ctx) return
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * Math.random() * 0.3 + 0.7})`
        ctx.fill()
      })
    }

    const drawPlanet = (x: number, y: number, radius: number, color: string) => {
      if (!ctx) return

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)

      const gradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius)
      gradient.addColorStop(0, lightenColor(color, 30))
      gradient.addColorStop(1, darkenColor(color, 20))

      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(x - radius * 0.2, y - radius * 0.2, radius * 0.15, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fill()
    }

    const lightenColor = (color: string, percent: number) => {
      const num = Number.parseInt(color.replace("#", ""), 16)
      const amt = Math.round(2.55 * percent)
      const R = (num >> 16) + amt
      const G = ((num >> 8) & 0x00ff) + amt
      const B = (num & 0x0000ff) + amt
      return `#${(0x1000000 + (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 0 ? 0 : B) : 255)).toString(16).slice(1)}`
    }

    const darkenColor = (color: string, percent: number) => {
      return lightenColor(color, -percent)
    }

    let animationFrameId: number

    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, width, height)

      const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
      bgGradient.addColorStop(0, "#0f0f1a")
      bgGradient.addColorStop(1, "#1a1a2e")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)
      stars.forEach((star) => {
        star.y += star.speed
        if (star.y > height) {
          star.y = 0
          star.x = Math.random() * width
        }
      })
      drawStars()

      planets.forEach((planet) => {
        planet.angle += planet.speed * 0.01

        planet.x += Math.cos(planet.angle) * 0.2
        planet.y += Math.sin(planet.angle) * 0.2
        if (planet.x < -planet.radius) planet.x = width + planet.radius
        if (planet.x > width + planet.radius) planet.x = -planet.radius
        if (planet.y < -planet.radius) planet.y = height + planet.radius
        if (planet.y > height + planet.radius) planet.y = -planet.radius

        drawPlanet(planet.x, planet.y, planet.radius, planet.color)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      planets[0].x = width * 0.2
      planets[0].y = height * 0.3
      planets[1].x = width * 0.8
      planets[1].y = height * 0.7
      planets[2].x = width * 0.5
      planets[2].y = height * 0.2
      planets[3].x = width * 0.7
      planets[3].y = height * 0.4

      stars.length = 0
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          brightness: Math.random() * 0.5 + 0.5,
          speed: Math.random() * 0.05 + 0.01,
        })
      }
    }

    window.addEventListener("resize", handleResize)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" style={{ width: "100%", height: "100%" }} />
}

export default SimpleGalaxyAnimation