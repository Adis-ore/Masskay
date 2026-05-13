import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  '> Initializing DataVoyant v2.5.1...',
  '> Loading datasets:  [████████████████]  100%',
  '> Analysis engine ready. Launching interface...',
]

export default function TerminalBoot({ onComplete }) {
  const [visible, setVisible] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    function addLine() {
      if (i < LINES.length) {
        setVisible(prev => [...prev, LINES[i]])
        i++
        setTimeout(addLine, 380)
      } else {
        setTimeout(() => setDone(true), 350)
        setTimeout(() => onComplete(), 850)
      }
    }
    setTimeout(addLine, 150)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
            background: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'var(--accent-cyan)',
              lineHeight: 2,
            }}
          >
            {visible.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
