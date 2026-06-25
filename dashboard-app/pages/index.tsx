import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/dashboard.module.css'
import ClientCard from '../components/ClientCard'

interface Client {
  id: string
  name: string
  color: string
  type: string
  platforms: Array<{ name: string; followers: number; engagement: number }>
  monthlyGoal: { followers: number; engagement: string }
  thisWeekPosts: number
  assetsReady: number
  nextBatch: string
  status: string
  topPost: { title: string; engagement: string; reach: string }
  intelligence?: {
    rule: string
    insight: string
    action: string
  }
}

interface Data {
  lastUpdated: string
  engagementWindow: string
  clients: Client[]
  weeklyPerformance: any
  automationStatus: any
}

export default function Dashboard() {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch client data from API (reads from canonical files)
        const clientsRes = await fetch('/api/clients')
        const clients = await clientsRes.json()

        // Build aggregate data
        const totalPosts = clients.reduce((sum: number, c: any) => sum + (c.thisWeekPosts || 0), 0)
        const assetsReady = clients.reduce((sum: number, c: any) => sum + (c.assetsReady || 0), 0)
        const avgEngagement = 3.4

        const data = {
          lastUpdated: new Date().toISOString(),
          engagementWindow: '12:00 PM - 3:00 PM',
          clients,
          weeklyPerformance: {
            totalPosts,
            assetsReady,
            assetsMissing: 1,
            avgEngagement,
            topClient: clients[0]?.name || 'N/A',
            needsAttention: [
              'Marée Creative - Resume posting immediately',
              'Gallery Madison & Germantown - Launch July 1',
              'Bellamare - Increase to 4 posts/week',
            ],
          },
          automationStatus: {
            performanceAnalyzer: {
              name: 'Performance Analyzer',
              lastRun: 'Not yet scheduled',
              nextRun: 'July 7, 2026 10:00 AM',
              status: 'pending',
            },
            timeRecommender: {
              name: 'Optimal Time Recommender',
              lastRun: 'Not yet scheduled',
              nextRun: 'July 7, 2026 11:00 AM',
              status: 'pending',
            },
            diversityTracker: {
              name: 'Content Diversity Tracker',
              lastRun: 'Not yet scheduled',
              nextRun: 'July 4, 2026 3:00 PM',
              status: 'pending',
            },
            trendSpotter: {
              name: 'Trend & Agility Spotter',
              lastRun: 'Not yet scheduled',
              nextRun: 'June 25, 2026 8:00 AM',
              status: 'pending',
            },
            competitorMonitor: {
              name: 'Competitor Activity Monitor',
              lastRun: 'Not yet scheduled',
              nextRun: 'June 25, 2026 9:00 AM',
              status: 'pending',
            },
            productionManager: {
              name: 'Production Pipeline Manager',
              lastRun: 'Not yet scheduled',
              nextRun: 'June 30, 2026 6:00 PM',
              status: 'pending',
            },
            intelligenceReport: {
              name: 'Weekly Intelligence Report',
              lastRun: 'Not yet scheduled',
              nextRun: 'July 4, 2026 4:00 PM',
              status: 'pending',
            },
          },
        }

        setData(data)
        setLoading(false)
      } catch (err) {
        console.error('Error loading data:', err)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <div className={styles.loading}>Loading dashboard...</div>
  if (!data) return <div className={styles.error}>Error loading dashboard</div>

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>📊 Marée Creative</h1>
        <div className={styles.headerRight}>
          <div className={styles.dateInfo}>
            <div className={styles.week}>Week of June 24–30, 2026</div>
            <div className={styles.lastUpdated}>Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}</div>
          </div>
        </div>
      </header>

      {/* ENGAGEMENT WINDOW */}
      <div className={styles.engagementBanner}>
        <div className={styles.engagementLabel}>⏰ ENGAGEMENT WINDOW</div>
        <div className={styles.engagementTime}>{data.engagementWindow}</div>
        <div className={styles.engagementText}>Check all platforms, reply to DMs, monitor comments</div>
      </div>

      {/* QUICK STATS */}
      <div className={styles.statsGrid}>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{data.weeklyPerformance.totalPosts}</div>
          <div className={styles.statLabel}>Posts This Week</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{data.weeklyPerformance.assetsReady}</div>
          <div className={styles.statLabel}>Assets Ready</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{data.weeklyPerformance.assetsMissing}</div>
          <div className={styles.statLabel}>Assets Missing</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{data.weeklyPerformance.avgEngagement}%</div>
          <div className={styles.statLabel}>Avg Engagement</div>
        </div>
      </div>

      {/* ALERTS */}
      {data.weeklyPerformance.needsAttention.length > 0 && (
        <div className={styles.alertBox}>
          <div className={styles.alertTitle}>⚠️ Needs Attention</div>
          <ul className={styles.alertList}>
            {data.weeklyPerformance.needsAttention.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* CLIENTS GRID */}
      <h2 className={styles.sectionTitle}>Your Accounts — Click to Edit</h2>
      <div className={styles.clientsGrid}>
        {data.clients.map((client) => (
          <ClientCard
            key={client.id}
            id={client.id}
            name={client.name}
            color={client.color}
            type={client.type}
            platforms={client.platforms}
            thisWeekPosts={client.thisWeekPosts}
            assetsReady={client.assetsReady}
            status={client.status}
            intelligence={client.intelligence}
            onUpdate={(field, value) => {
              // Refetch data after update
              window.location.reload()
            }}
          />
        ))}
      </div>

      {/* AUTOMATION STATUS */}
      <h2 className={styles.sectionTitle}>Automation Status</h2>
      <div className={styles.automationGrid}>
        {Object.entries(data.automationStatus).map(([key, agent]: any) => (
          <div key={key} className={styles.automationCard}>
            <div className={styles.automationDot} style={{ background: agent.status === 'active' ? '#10b981' : '#f59e0b' }}></div>
            <div>
              <div className={styles.automationName}>{agent.name}</div>
              <div className={styles.automationMeta}>Last: {agent.lastRun}</div>
              <div className={styles.automationMeta}>Next: {agent.nextRun}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div>Updates every hour from Claude Code agents</div>
        <div>GitHub integration syncs all changes</div>
      </footer>
    </div>
  )
}
