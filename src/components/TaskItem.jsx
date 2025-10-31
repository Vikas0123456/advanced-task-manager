import React, { memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { TrashIcon, TaskIcon } from './Icons'
import '../styles/TaskItem.css'

const TaskItem = memo(({ task, index, onToggle, onDelete }) => {
  const handleToggle = (e) => {
    e.stopPropagation()
    onToggle(task.id)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(task.id)
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`task-item ${task.completed ? 'completed' : 'pending'} ${snapshot.isDragging ? 'dragging' : ''}`}
        >
          <div 
            {...provided.dragHandleProps}
            className="task-drag-handle"
            aria-label="Drag to reorder"
          >
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="4" r="1.5" fill="currentColor"/>
              <circle cx="2" cy="10" r="1.5" fill="currentColor"/>
              <circle cx="2" cy="16" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
              <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <div className="task-checkbox-wrapper" onClick={handleToggle}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              className="task-checkbox"
              aria-label="Toggle task completion"
            />
            <span className="checkbox-custom">
              {task.completed && (
                <span className="checkmark">
                  <TaskIcon size={16} color="white" />
                </span>
              )}
            </span>
          </div>
          <div className="task-content">
            <span className="task-text">{task.text}</span>
            <span className="task-status-badge">
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          <button
            onClick={handleDelete}
            className="task-delete"
            aria-label="Delete task"
            title="Delete task"
          >
            <TrashIcon size={18} color="var(--danger-color)" />
          </button>
        </div>
      )}
    </Draggable>
  )
})

TaskItem.displayName = 'TaskItem'

export default TaskItem

