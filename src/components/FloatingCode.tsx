'use client'

import { FiCode, FiCommand, FiCpu, FiDatabase, FiGitBranch, FiTerminal } from 'react-icons/fi'

const marks = [
  { Icon: FiCode, position: 'markOne', label: 'code' },
  { Icon: FiTerminal, position: 'markTwo', label: 'terminal' },
  { Icon: FiDatabase, position: 'markThree', label: 'database' },
  { Icon: FiGitBranch, position: 'markFour', label: 'git branch' },
  { Icon: FiCpu, position: 'markFive', label: 'cpu' },
  { Icon: FiCommand, position: 'markSix', label: 'command' },
]

export default function FloatingCode() {
  return <div className="floating-code-wrap" aria-hidden="true">{marks.map(({ Icon, position, label }) => <span key={label} className={`floating-token ${position}`}><Icon /></span>)}</div>
}
