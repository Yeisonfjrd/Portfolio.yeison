"use client"

import { useEffect, useRef } from "react"

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const particles: Particle[] = []
    const numParticles = 200
    const colors = ["#8b5cf6", "#6d28d9", "#4c1d95", "#7c3aed"]

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      spin: number
      spinSpeed: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.2
        this.speedY = (Math.random() - 0.5) * 0.2
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.alpha = Math.random() * 0.5 + 0.1
        this.spin = Math.random() * Math.PI * 2
        this.spinSpeed = (Math.random() - 0.5) * 0.01
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.spin += this.spinSpeed

        if (this.x > width) this.x = 0
        else if (this.x < 0) this.x = width
        if (this.y > height) this.y = 0
        else if (this.y < 0) this.y = height

        this.alpha = Math.abs(Math.sin(this.spin) * 0.5) + 0.1
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
        gradient.addColorStop(0, `${this.color}40`)
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const nebulas = [
      {
        x: width * 0.3,
        y: height * 0.4,
        size: 150,
        color: "#4c1d95",
      },
      {
        x: width * 0.7,
        y: height * 0.6,
        size: 200,
        color: "#6d28d9",
      },
      {
        x: width * 0.5,
        y: height * 0.2,
        size: 180,
        color: "#7c3aed",
      },
    ]

    const drawNebula = (x: number, y: number, size: number, color: string) => {
      if (!ctx) return
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `${color}20`)
      gradient.addColorStop(0.5, `${color}10`)
      gradient.addColorStop(1, "transparent")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle())
    }

    const createBackgroundGradient = (): CanvasGradient | null => {
      if (!ctx) return null;
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#0f0f1a");
      gradient.addColorStop(0.5, "#1a1a2e");
      gradient.addColorStop(1, "#2a1a3a");
      return gradient;
    };    

    let animationFrameId: number

    const animate = () => {
      if (!ctx) return;
      
      const gradient = createBackgroundGradient();
      if (gradient) {
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = "#0f0f1a";
      }
      
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            if (!ctx) return
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 opacity-70"
      style={{
        background: "linear-gradient(to bottom, #0f0f1a, #1a1a2e, #2a1a3a)",
      }}
    />
  )
}

export default BackgroundAnimation