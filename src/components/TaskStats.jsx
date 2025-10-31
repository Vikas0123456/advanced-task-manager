import React, { memo, useMemo } from 'react'
import { useTasks } from '../context/TaskContext'
import { ClipboardIcon, ClockIcon, CheckCircleIcon, ChartIcon } from './Icons'
import '../styles/TaskStats.css'

const TaskStats = memo(() => {
  const { tasks } = useTasks()

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const pending = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, completed, pending, completionRate }
  }, [tasks])

  return (
    <div className="task-stats">
      <div className="stat-card stat-total">
        <div className="stat-icon-wrapper">
          <ClipboardIcon size={28} color="var(--stat-icon-color)" />
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
      </div>
      <div className="stat-card stat-pending">
        <div className="stat-icon-wrapper">
          <ClockIcon size={28} color="var(--stat-icon-color)" />
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>
      <div className="stat-card stat-completed">
        <div className="stat-icon-wrapper">
          <CheckCircleIcon size={28} color="var(--stat-icon-color)" />
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>
      <div className="stat-card stat-progress">
        <div className="stat-icon-wrapper">
          <ChartIcon size={28} color="var(--stat-icon-color)" />
        </div>
        <div className="stat-info">
          <div className="stat-value">{stats.completionRate}%</div>
          <div className="stat-label">Complete</div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>
    </div>
  )
})

TaskStats.displayName = 'TaskStats'

export default TaskStats

