import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const lineData = [
  { t: 'Jan', v: 4200 },
  { t: 'Feb', v: 3800 },
  { t: 'Mar', v: 5100 },
  { t: 'Apr', v: 4700 },
  { t: 'May', v: 6200 },
  { t: 'Jun', v: 5800 },
  { t: 'Jul', v: 7100 },
  { t: 'Aug', v: 8400 },
]

const barData = [
  { name: 'Q1', val: 65 },
  { name: 'Q2', val: 82 },
  { name: 'Q3', val: 74 },
  { name: 'Q4', val: 91 },
]

const tickStyle = { fontSize: 9, fill: '#44445a', fontFamily: 'JetBrains Mono' }

const tooltipStyle = {
  contentStyle: {
    background: 'var(--bg-surface)',
    border: '1px solid rgba(0,212,255,0.2)',
    borderRadius: 4,
    fontSize: 10,
    fontFamily: 'JetBrains Mono',
    color: 'var(--text-primary)',
  },
  cursor: { stroke: 'rgba(0,212,255,0.15)' },
}

export default function HeroMiniDashboard() {
  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--glow-cyan)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Decorative dot grid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: '55%',
          backgroundImage:
            'radial-gradient(circle, rgba(0,212,255,0.05) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
          borderRadius: '0 16px 16px 0',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          REVENUE ANALYTICS
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span
            className="pulse-dot"
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--accent-green)',
            }}
          />
          <span style={{ fontSize: '0.58rem', color: 'var(--accent-green)', letterSpacing: '0.1em' }}>
            ANALYSIS RUNNING
          </span>
        </div>
      </div>

      {/* KPI stat */}
      <div style={{ marginBottom: '0.9rem' }}>
        <p style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
          TOTAL REVENUE YTD
        </p>
        <p style={{ fontSize: '1.55rem', fontWeight: 600, color: 'var(--accent-cyan)', lineHeight: 1.1 }}>
          $8.4M
        </p>
        <p style={{ fontSize: '0.62rem', color: 'var(--accent-green)', marginTop: '0.15rem' }}>
          ▲ +24.3% vs prev year
        </p>
      </div>

      {/* Line chart */}
      <div style={{ marginBottom: '0.9rem' }}>
        <p style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
          MONTHLY TREND ($K)
        </p>
        <ResponsiveContainer width="100%" height={78}>
          <LineChart data={lineData} margin={{ top: 2, right: 4, left: -32, bottom: 0 }}>
            <XAxis dataKey="t" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              {...tooltipStyle}
              formatter={v => [`$${(v / 1000).toFixed(1)}K`]}
            />
            <Line
              type="monotone"
              dataKey="v"
              stroke="#00d4ff"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)', marginBottom: '0.9rem' }} />

      {/* Bar chart */}
      <div>
        <p style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
          QUOTA ATTAINMENT (%)
        </p>
        <ResponsiveContainer width="100%" height={56}>
          <BarChart data={barData} margin={{ top: 0, right: 4, left: -32, bottom: 0 }}>
            <XAxis dataKey="name" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Bar
              dataKey="val"
              fill="#00ff88"
              radius={[2, 2, 0, 0]}
              isAnimationActive
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
