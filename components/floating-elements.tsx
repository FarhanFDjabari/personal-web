"use client"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <div
        className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"
        style={{
          left: mousePosition.x * 0.02 + "px",
          top: mousePosition.y * 0.02 + "px",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-96 h-96 bg-primary/3 rounded-full blur-3xl"
        style={{
          right: mousePosition.x * 0.01 + "px",
          bottom: mousePosition.y * 0.01 + "px",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute w-32 h-32 bg-primary/10 rounded-full blur-2xl"
        style={{
          left: "20%",
          top: "60%",
          animation: "float 4s ease-in-out infinite",
        }}
      />
    </div>
  )
}
