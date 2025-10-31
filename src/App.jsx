import React, { useState, useCallback } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { TaskProvider, useTasks } from './context/TaskContext'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterButtons from './components/FilterButtons'
import ThemeToggle from './components/ThemeToggle'
import TaskStats from './components/TaskStats'
import './styles/App.css'

const AppContent = () => {
  const [filter, setFilter] = useState('all')
  const { tasks, reorderTasks } = useTasks()

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    // Only allow drag and drop when showing all tasks
    // For filtered views, map filtered indices to original array indices
    if (filter === 'all') {
      reorderTasks(result.source.index, result.destination.index)
    } else {
      // For filtered views, we need to map filtered indices to original array indices
      const filteredTasks = filter === 'completed'
        ? tasks.filter(task => task.completed)
        : tasks.filter(task => !task.completed)
      
      const draggedTaskId = filteredTasks[result.source.index]?.id
      const targetTaskId = filteredTasks[result.destination.index]?.id
      
      if (!draggedTaskId || !targetTaskId) return
      
      // Find indices in original array
      const originalTasks = [...tasks]
      const draggedIndex = originalTasks.findIndex(t => t.id === draggedTaskId)
      const targetIndex = originalTasks.findIndex(t => t.id === targetTaskId)
      
      if (draggedIndex === -1 || targetIndex === -1) return
      
      reorderTasks(draggedIndex, targetIndex)
    }
  }, [tasks, reorderTasks, filter])

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="header-title">
              <h1>Task Manager</h1>
              <p className="header-subtitle">Stay organized and productive</p>
            </div>
            <ThemeToggle />
          </div>
        </header>
        <main className="app-main">
          <TaskStats />
          <div className="content-section">
            <TaskForm />
            <FilterButtons filter={filter} onFilterChange={handleFilterChange} />
            <TaskList filter={filter} />
          </div>
        </main>
      </div>
    </DragDropContext>
  )
}

const App = () => {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  )
}

export default App

