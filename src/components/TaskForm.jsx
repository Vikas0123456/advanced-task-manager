import React, { memo, useState, useCallback } from 'react'
import { useTasks } from '../context/TaskContext'
import { PlusIcon } from './Icons'
import '../styles/TaskForm.css'

const TaskForm = memo(() => {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const { addTask } = useTasks()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    
    if (input.trim() === '') {
      setError('Task cannot be empty')
      return
    }

    addTask(input)
    setInput('')
    setError('')
  }, [input, addTask])

  const handleChange = useCallback((e) => {
    setInput(e.target.value)
    if (error) setError('')
  }, [error])

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="What needs to be done?"
          className={`task-input ${error ? 'error' : ''}`}
          aria-label="Task input"
        />
        <button type="submit" className="task-submit">
          <PlusIcon size={20} color="white" />
          <span>Add Task</span>
        </button>
      </div>
      {error && <span className="error-message">{error}</span>}
    </form>
  )
})

TaskForm.displayName = 'TaskForm'

export default TaskForm

