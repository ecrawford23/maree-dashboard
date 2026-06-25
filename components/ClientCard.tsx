import { useState } from 'react'
import styles from '../styles/dashboard.module.css'

interface ClientCardProps {
  id: string
  name: string
  color: string
  type: string
  platforms: Array<{ name: string; followers: number; engagement: number }>
  thisWeekPosts: number
  assetsReady: number
  status: string
  intelligence?: {
    rule: string
    insight: string
    action: string
  }
  onUpdate: (field: string, value: any) => void
}

export default function ClientCard({
  id,
  name,
  color,
  type,
  platforms,
  thisWeekPosts,
  assetsReady,
  status,
  intelligence,
  onUpdate,
}: ClientCardProps) {
  const [editMode, setEditMode] = useState(false)
  const [editState, setEditState] = useState({
    thisWeekPosts,
    assetsReady,
    status,
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editState),
      })
      onUpdate('thisWeekPosts', editState.thisWeekPosts)
      onUpdate('assetsReady', editState.assetsReady)
      onUpdate('status', editState.status)
      setEditMode(false)
    } catch (error) {
      console.error('Error saving:', error)
      alert('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  if (editMode) {
    return (
      <div className={styles.clientCard} style={{ borderLeftColor: color }}>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom: 16 }}>{name}</h3>

          {/* POSTS FIELD */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600 }}>
              Posts This Week
            </label>
            <input
              type="number"
              value={editState.thisWeekPosts}
              onChange={(e) => setEditState({ ...editState, thisWeekPosts: parseInt(e.target.value) })}
              style={{
                width: '100%',
                padding: '8px',
                border: `1px solid ${color}`,
                borderRadius: 4,
                fontSize: 14,
              }}
            />
          </div>

          {/* ASSETS FIELD */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600 }}>
              Assets Ready
            </label>
            <input
              type="number"
              value={editState.assetsReady}
              onChange={(e) => setEditState({ ...editState, assetsReady: parseInt(e.target.value) })}
              style={{
                width: '100%',
                padding: '8px',
                border: `1px solid ${color}`,
                borderRadius: 4,
                fontSize: 14,
              }}
            />
          </div>

          {/* STATUS DROPDOWN */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600 }}>
              Status
            </label>
            <select
              value={editState.status}
              onChange={(e) => setEditState({ ...editState, status: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                border: `1px solid ${color}`,
                borderRadius: 4,
                fontSize: 14,
              }}
            >
              <option>On Track</option>
              <option>Exceeding</option>
              <option>Below Goal</option>
              <option>Behind</option>
              <option>Launching</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                flex: 1,
                padding: '10px',
                background: color,
                color: 'white',
                border: 'none',
                borderRadius: 4,
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setEditMode(false)
                setEditState({ thisWeekPosts, assetsReady, status })
              }}
              style={{
                flex: 1,
                padding: '10px',
                background: '#e0e0e0',
                color: '#333',
                border: 'none',
                borderRadius: 4,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={styles.clientCard}
      style={{ borderLeftColor: color, cursor: 'pointer' }}
      onClick={() => setEditMode(true)}
    >
      <div className={styles.clientHeader}>
        <div>
          <div className={styles.clientName}>{name}</div>
          <div className={styles.clientType}>{type}</div>
        </div>
        <div
          className={styles.statusBadge}
          style={{
            background:
              status === 'Exceeding'
                ? '#d1f0d8'
                : status === 'On Track'
                  ? '#dbeafe'
                  : status === 'Behind'
                    ? '#f8d7da'
                    : '#ffeaa7',
            color:
              status === 'Exceeding'
                ? '#155724'
                : status === 'On Track'
                  ? '#1e40af'
                  : status === 'Behind'
                    ? '#721c24'
                    : '#856404',
          }}
        >
          {status}
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressItem}>
          <div className={styles.progressLabel}>Posts ({thisWeekPosts})</div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(thisWeekPosts / 7) * 100}%`, background: color }}
            ></div>
          </div>
        </div>
        <div className={styles.progressItem}>
          <div className={styles.progressLabel}>
            Assets ({assetsReady}/{thisWeekPosts})
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(assetsReady / thisWeekPosts) * 100}%`, background: '#10b981' }}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {platforms.map((platform) => (
          <div key={platform.name} className={styles.metric}>
            <div className={styles.metricLabel}>{platform.name}</div>
            <div className={styles.metricValue}>{platform.followers.toLocaleString()}</div>
            <div className={styles.metricSmall}>{platform.engagement}% eng</div>
          </div>
        ))}
      </div>

      {intelligence && (
        <div className={styles.intelligenceBox} style={{ borderLeftColor: color, background: `${color}08` }}>
          <div className={styles.intelligenceRule} style={{ color: color, fontWeight: 600, fontSize: 12 }}>
            💡 {intelligence.rule}
          </div>
          <div className={styles.intelligenceInsight} style={{ fontSize: 13, marginTop: 6 }}>
            {intelligence.insight}
          </div>
          <div className={styles.intelligenceAction} style={{ color: color, fontSize: 12, marginTop: 8, fontWeight: 500 }}>
            → {intelligence.action}
          </div>
        </div>
      )}

      <div
        className={styles.actionBtn}
        style={{ background: color, color: 'white', textAlign: 'center' }}
      >
        Click to Edit
      </div>
    </div>
  )
}
