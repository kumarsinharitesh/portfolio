'use client'

import { useEffect, useState } from 'react'

const TOKENS = [
  'const', 'let', 'async', 'await', 'return', 'export', 'import', 'function',
  '=>', '{}', '[]', '()', '&&', '||', '!==', '===', '++', '/*', '*/',
  '<div>', '</>', '</>',  '{ }', '[ ]',
  'npm run dev', 'git commit', 'git push', 'yarn add',
  'useState()', 'useEffect()', 'fetch()', '.then()',
  '// TODO:', '#include', 'print()', 'console.log()',
  'SELECT *', 'INSERT INTO', 'JOIN', 'WHERE',
  '01', '10', '110', '001', '101',
]

const COLORS = [
  'rgba(6,182,212,VAL)',    // cyan
  'rgba(139,92,246,VAL)',   // violet
  'rgba(16,185,129,VAL)',   // emerald
  'rgba(248,158,11,VAL)',   // amber
  'rgba(244,63,94,VAL)',    // rose
]

interface Token {
  id: number
  text: string
  left: number
  duration: number
  delay: number
  color: string
  rot: number
  size: number
}

export default function FloatingCode() {
  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    const generated: Token[] = Array.from({ length: 32 }, (_, i) => {
      const color = COLORS[i % COLORS.length].replace('VAL', '0.9')
      return {
        id: i,
        text: TOKENS[i % TOKENS.length],
        left: Math.random() * 94,
        duration: Math.random() * 22 + 20,  // 20–42s
        delay: Math.random() * -35,
        color,
        rot: (Math.random() - 0.5) * 10,
        size: Math.random() * 0.3 + 1.0,    // 1.0x–1.3x scale
      }
    })
    setTokens(generated)
  }, [])

  return (
    <div className="floating-code-wrap" aria-hidden="true">
      {tokens.map(t => (
        <span
          key={t.id}
          className="floating-token"
          style={{
            left: `${t.left}%`,
            bottom: '-4rem',
            color: t.color,
            animationDuration: `${t.duration}s`,
            animationDelay: `${t.delay}s`,
            fontSize: `calc(${t.size} * clamp(0.65rem, 1.2vw, 0.88rem))`,
            '--rot': `${t.rot}deg`,
          } as React.CSSProperties}
        >
          {t.text}
        </span>
      ))}
    </div>
  )
}
