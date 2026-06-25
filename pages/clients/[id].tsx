import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/dashboard.module.css'

interface Post {
  date: string
  platform: string
  title: string
  engagement: string
  reach: string
  type: string
}

interface Client {
  id: string
  name: string
  color: string
  type: string
  location: string
  platforms: Array<{ name: string; followers: number; engagement: number; url: string }>
  monthlyGoal: { followers: number; engagement: string }
  competitors: string[]
  keywordsFocus: string[]
  thisWeekPosts: number
  assetsReady: number
  nextBatch: string
  status: string
  topPost: { title: string; engagement: string; reach: string }
  contentThemes: string[]
  posts?: Post[]
}

export default function ClientDetail() {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { id } = router.query
    if (!id) return

    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const found = data.clients.find((c: Client) => c.id === id)
        setClient(found)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [router.query])

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (!client) return <div className={styles.error}>Client not found</div>

  return (
    <div className={styles.container}>
      {/* BACK BUTTON */}
      <div style={{ marginBottom: 32 }}>
        <Link href="/" style={{ color: client.color, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
          ← Back to Dashboard
        </Link>
      </div>

      {/* HEADER */}
      <header className={styles.header}>
        <div>
          <h1 style={{ margin: 0, marginBottom: 8 }}>{client.name}</h1>
          <div style={{ color: '#8a8880', fontSize: 13 }}>{client.type} • {client.location}</div>
        </div>
        <div style={{ padding: '8px 16px', background: client.color, color: 'white', borderRadius: 4, fontWeight: 600, fontSize: 12 }}>
          {client.status}
        </div>
      </header>

      {/* MONTHLY GOAL */}
      <div className={styles.engagementBanner} style={{ background: `linear-gradient(135deg, ${client.color}dd 0%, ${client.color} 100%)` }}>
        <div className={styles.engagementLabel}>📈 MONTHLY GOAL</div>
        <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
          +{client.monthlyGoal.followers} followers • {client.monthlyGoal.engagement} engagement
        </div>
      </div>

      {/* PLATFORMS */}
      <h2 className={styles.sectionTitle}>Platforms</h2>
      <div className={styles.clientsGrid} style={{ marginBottom: 40 }}>
        {client.platforms.map(platform => (
          <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className={styles.clientCard} style={{ textDecoration: 'none', borderLeftColor: client.color }}>
            <div className={styles.clientName}>{platform.name}</div>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div className={styles.metricLabel}>Followers</div>
                <div className={styles.metricValue}>{platform.followers.toLocaleString()}</div>
              </div>
              <div>
                <div className={styles.metricLabel}>Engagement</div>
                <div className={styles.metricValue}>{platform.engagement}%</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* POSTING STATUS */}
      <h2 className={styles.sectionTitle}>This Week's Posts</h2>
      <div style={{ background: 'white', border: '1px solid #e0dcd8', padding: 24, marginBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
          <div>
            <div className={styles.metricLabel}>Scheduled</div>
            <div className={styles.metricValue} style={{ color: client.color }}>{client.thisWeekPosts}</div>
          </div>
          <div>
            <div className={styles.metricLabel}>Assets Ready</div>
            <div className={styles.metricValue} style={{ color: '#10b981' }}>{client.assetsReady}</div>
          </div>
          <div>
            <div className={styles.metricLabel}>Next Batch</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#2a2a2a' }}>{client.nextBatch}</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e0dcd8', paddingTop: 24 }}>
          <div className={styles.progressLabel}>Completion Progress</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${(client.assetsReady / client.thisWeekPosts) * 100}%`, background: client.color }}></div>
          </div>
          <div style={{ fontSize: 11, color: '#8a8880', marginTop: 8 }}>
            {client.assetsReady} of {client.thisWeekPosts} ready ({Math.round((client.assetsReady / client.thisWeekPosts) * 100)}%)
          </div>
        </div>
      </div>

      {/* TOP PERFORMING POST */}
      <h2 className={styles.sectionTitle}>Top Performing Post</h2>
      <div style={{ background: 'white', border: `1px solid #e0dcd8`, borderLeft: `4px solid ${client.color}`, padding: 24, marginBottom: 40 }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{client.topPost.title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          <div>
            <div className={styles.metricLabel}>Engagement</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{client.topPost.engagement}</div>
          </div>
          <div>
            <div className={styles.metricLabel}>Reach</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{client.topPost.reach}</div>
          </div>
        </div>
      </div>

      {/* CONTENT THEMES */}
      <h2 className={styles.sectionTitle}>Content Themes</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
        {client.contentThemes.map(theme => (
          <div key={theme} style={{ background: '#f3f4f6', padding: 16, border: `1px solid #e0dcd8`, borderLeft: `3px solid ${client.color}` }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{theme}</div>
          </div>
        ))}
      </div>

      {/* KEYWORDS */}
      <h2 className={styles.sectionTitle}>SEO Keywords</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
        {client.keywordsFocus.map(keyword => (
          <div key={keyword} style={{ background: client.color, color: 'white', padding: '8px 16px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
            {keyword}
          </div>
        ))}
      </div>

      {/* COMPETITORS */}
      <h2 className={styles.sectionTitle}>Competitors to Monitor</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        {client.competitors.map(competitor => (
          <div key={competitor} style={{ background: 'white', border: '1px solid #e0dcd8', padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{competitor}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
