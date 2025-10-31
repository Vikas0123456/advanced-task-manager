import React, { createContext, useContext, useCallback, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])

  const addTask = useCallback((text) => {
    if (text.trim() === '') return
    
    const newTask = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }, [setTasks])

  const toggleTask = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }, [setTasks])

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }, [setTasks])

  const reorderTasks = useCallback((startIndex, endIndex) => {
    setTasks((prevTasks) => {
      const result = Array.from(prevTasks)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    })
  }, [setTasks])

  const value = useMemo(() => ({
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
  }), [tasks, addTask, toggleTask, deleteTask, reorderTasks])

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

