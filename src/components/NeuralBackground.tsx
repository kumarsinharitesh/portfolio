'use client'

import { useEffect, useRef } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Node {
  x: number
  y: number
  vx: number
  vy: number
  ox: number          // origin x (home position)
  oy: number          // origin y
  r: number           // base radius
  glow: number        // glow intensity 0–1
  label: string
  opacity: number
  phase: number       // individual pulse phase
  speed: number       // individual pulse speed
  accent: boolean     // violet accent node
}

// ─── Constants ───────────────────────────────────────────────────────────────
const CYAN        = { r: 0,   g: 230, b: 230 }
const VIOLET      = { r: 160, g: 100, b: 255 }
const NODE_COUNT  = 68
const CONNECT_DIST = 170
const MOUSE_RADIUS = 190
const ATTRACT_STR  = 0.06
const DAMPING      = 0.88
const FLOAT_SPEED  = 0.45

function randLabel(): string {
  const prefix = ['pos', 'vec', 'node', 'pt', 'nx']
  const p = prefix[Math.floor(Math.random() * prefix.length)]
  const a = Math.floor(Math.random() * 99)
  const b = Math.floor(Math.random() * 99)
  return `${p},${a}.${b}`
}

function rgba(a: number, accent = false) {
  const c = accent ? VIOLET : CYAN
  return `rgba(${c.r},${c.g},${c.b},${a})`
}
function rgbaWhite(a: number) {
  return `rgba(220,255,255,${a})`
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    let nodes: Node[] = []
    let mouse = { x: -9999, y: -9999 }
    let animId: number

    // ── Noise texture (pre-rendered offscreen) ──────────────────
    let noiseBmp: ImageBitmap | null = null
    const buildNoise = async () => {
      const off = new OffscreenCanvas(512, 512)
      const oc  = off.getContext('2d')!
      const img = oc.createImageData(512, 512)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() < 0.12 ? Math.floor(Math.random() * 80) : 0
        img.data[i]   = 0
        img.data[i+1] = v
        img.data[i+2] = v
        img.data[i+3] = Math.floor(Math.random() * 40)
      }
      oc.putImageData(img, 0, 0)
      noiseBmp = await createImageBitmap(off)
    }

    // ── Init nodes ──────────────────────────────────────────────
    const init = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight

      nodes = Array.from({ length: NODE_COUNT }, () => {
        const x = Math.random() * W
        const y = Math.random() * H
        return {
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * FLOAT_SPEED * 2,
          vy: (Math.random() - 0.5) * FLOAT_SPEED * 2,
          r: Math.random() * 2.8 + 2.2,          // bigger base radius
          glow: Math.random(),
          label: randLabel(),
          opacity: Math.random() * 0.35 + 0.65,  // much more opaque
          phase: Math.random() * Math.PI * 2,    // individual pulse phase
          speed: Math.random() * 0.012 + 0.006,  // individual pulse speed
          accent: Math.random() < 0.18,           // ~18% violet nodes
        }
      })
    }

    // ── Draw tiled noise layer ──────────────────────────────────
    const drawNoise = () => {
      if (!noiseBmp) return
      ctx.save()
      ctx.globalAlpha = 0.18
      // tile it across the canvas
      for (let tx = 0; tx < W; tx += 512)
        for (let ty = 0; ty < H; ty += 512)
          ctx.drawImage(noiseBmp, tx, ty)
      ctx.restore()
    }

    // ── Draw edges (dashed + solid mix) ────────────────────────
    const drawEdges = (t: number) => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > CONNECT_DIST) continue

          const miDx  = nodes[i].x - mouse.x
          const miDy  = nodes[i].y - mouse.y
          const mjDx  = nodes[j].x - mouse.x
          const mjDy  = nodes[j].y - mouse.y
          const nearI = Math.sqrt(miDx*miDx + miDy*miDy) < MOUSE_RADIUS
          const nearJ = Math.sqrt(mjDx*mjDx + mjDy*mjDy) < MOUSE_RADIUS
          const bothNear = nearI && nearJ

          const baseFade = 1 - dist / CONNECT_DIST
          const boost    = bothNear ? 3.5 : (nearI || nearJ) ? 2.2 : 1
          const alpha    = Math.min(baseFade * 0.55 * boost, 1)
          const lineW    = bothNear ? 1.6 : (nearI || nearJ) ? 1.1 : 0.8

          ctx.save()
          // dashed for distant, solid for mouse-near
          if (!nearI && !nearJ) {
            ctx.setLineDash([3, 6])
            ctx.lineDashOffset = -t * 0.01
          } else {
            ctx.setLineDash([])
          }

          const accI = nodes[i].accent, accJ = nodes[j].accent
          const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
          grad.addColorStop(0, rgba(alpha, accI))
          grad.addColorStop(1, rgba(alpha * 0.6, accJ))

          ctx.beginPath()
          ctx.strokeStyle = grad
          ctx.lineWidth   = lineW
          ctx.shadowColor = rgba(alpha * 0.5, accI)
          ctx.shadowBlur  = bothNear ? 6 : 2
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
          ctx.restore()
        }
      }
    }

    // ── Draw nodes ──────────────────────────────────────────────
    const drawNodes = (t: number) => {
      for (const n of nodes) {
        // per-node sine pulse
        const pulse = Math.sin(n.phase + t * n.speed) * 0.25 + 0.75

        const mdx   = n.x - mouse.x
        const mdy   = n.y - mouse.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        const near  = mDist < MOUSE_RADIUS
        const hot   = mDist < MOUSE_RADIUS * 0.45  // very close

        const coreR  = near ? n.r * 2.2 : n.r * pulse
        const acc    = n.accent

        // ── Layer 1: large outer glow ──────────────────────────
        const haloR = near ? n.r * 22 : n.r * 14
        const haloA = near ? 0.28 : n.opacity * 0.22 * pulse
        const halo  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR)
        halo.addColorStop(0,    rgba(haloA, acc))
        halo.addColorStop(0.45, rgba(haloA * 0.35, acc))
        halo.addColorStop(1,    rgba(0, acc))
        ctx.beginPath()
        ctx.fillStyle = halo
        ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2)
        ctx.fill()

        // ── Layer 2: mid glow ring ─────────────────────────────
        const midR = near ? n.r * 9 : n.r * 5.5
        const midA = near ? 0.65 : n.opacity * 0.5 * pulse
        const mid  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, midR)
        mid.addColorStop(0,   rgba(midA, acc))
        mid.addColorStop(0.5, rgba(midA * 0.5, acc))
        mid.addColorStop(1,   rgba(0, acc))
        ctx.beginPath()
        ctx.fillStyle = mid
        ctx.arc(n.x, n.y, midR, 0, Math.PI * 2)
        ctx.fill()

        // ── Layer 3: bright core dot ───────────────────────────
        ctx.beginPath()
        ctx.fillStyle = hot ? rgbaWhite(1) : rgba(n.opacity * 0.95 * pulse, acc)
        ctx.shadowColor = rgba(1, acc)
        ctx.shadowBlur  = near ? 18 : 10
        ctx.arc(n.x, n.y, coreR, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // ── Layer 4: tiny bright centre pinpoint ───────────────
        ctx.beginPath()
        ctx.fillStyle = rgbaWhite(near ? 1 : 0.6 * pulse)
        ctx.arc(n.x, n.y, Math.max(coreR * 0.35, 1.2), 0, Math.PI * 2)
        ctx.fill()

        // ── Orbit ring on mouse-near nodes ─────────────────────
        if (near) {
          ctx.beginPath()
          ctx.strokeStyle = rgba(hot ? 0.9 : 0.5, acc)
          ctx.lineWidth   = hot ? 1.2 : 0.8
          ctx.arc(n.x, n.y, n.r * 5.5, 0, Math.PI * 2)
          ctx.stroke()
        }

        // ── Coordinate label ───────────────────────────────────
        if (n.glow > 0.6) {
          ctx.save()
          ctx.font      = `9px "JetBrains Mono", monospace`
          ctx.fillStyle = rgba(near ? 0.7 : 0.28, acc)
          ctx.fillText(n.label, n.x + coreR + 5, n.y - coreR)
          ctx.restore()
        }
      }
    }

    // ── Physics: attract to mouse, drift slowly ─────────────────
    const updateNodes = () => {
      for (const n of nodes) {
        const mdx   = mouse.x - n.x
        const mdy   = mouse.y - n.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)

        if (mDist < MOUSE_RADIUS && mDist > 0.1) {
          // pull toward cursor (stronger when closer)
          const force = (1 - mDist / MOUSE_RADIUS) * ATTRACT_STR
          n.vx += (mdx / mDist) * force * mDist * 0.012
          n.vy += (mdy / mDist) * force * mDist * 0.012
        }

        // continuous ambient float — nudge velocity every frame
        n.vx += (Math.random() - 0.5) * 0.08
        n.vy += (Math.random() - 0.5) * 0.08

        // clamp speed so nodes never race off screen
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
        if (speed > FLOAT_SPEED) {
          n.vx = (n.vx / speed) * FLOAT_SPEED
          n.vy = (n.vy / speed) * FLOAT_SPEED
        }

        // soft boundary bounce — push back when near edges
        const margin = 40
        if (n.x < margin)      n.vx += 0.12
        if (n.x > W - margin)  n.vx -= 0.12
        if (n.y < margin)      n.vy += 0.12
        if (n.y > H - margin)  n.vy -= 0.12

        n.vx *= DAMPING
        n.vy *= DAMPING
        n.x  += n.vx
        n.y  += n.vy
      }
    }

    // ── Main render loop ────────────────────────────────────────
    const render = (t: number) => {
      // deep dark background
      ctx.fillStyle = '#010a0f'
      ctx.fillRect(0, 0, W, H)

      drawNoise()
      drawEdges(t)
      drawNodes(t)
      updateNodes()

      animId = requestAnimationFrame(render)
    }

    // ── Mouse tracking ──────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    // ── Resize ──────────────────────────────────────────────────
    const ro = new ResizeObserver(init)
    ro.observe(canvas)

    canvas.addEventListener('mousemove',  onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    buildNoise().then(() => {
      init()
      animId = requestAnimationFrame(render)
    })

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      canvas.removeEventListener('mousemove',  onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        cursor: 'default',
      }}
    />
  )
}
