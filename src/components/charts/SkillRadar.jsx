import { useRef } from 'react'
import { useInView } from 'framer-motion'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'
import { skills } from '../../data/content'

export default function SkillRadar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} style={{ width: '100%', height: 360 }}>
      {inView && (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={skills.radar} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="rgba(0,212,255,0.1)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 11, fill: '#8888aa', fontFamily: 'JetBrains Mono' }}
            />
            <Radar
              name="Oyewusi Christopher"
              dataKey="score"
              stroke="#00d4ff"
              strokeWidth={1.5}
              fill="#00d4ff"
              fillOpacity={0.1}
              isAnimationActive
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
