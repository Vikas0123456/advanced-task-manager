import React, { memo, useMemo } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useTasks } from '../context/TaskContext'
import TaskItem from './TaskItem'
import '../styles/TaskList.css'

const TaskList = memo(({ filter }) => {
  const { tasks, toggleTask, deleteTask } = useTasks()

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed)
      case 'pending':
        return tasks.filter(task => !task.completed)
      default:
        return tasks
    }
  }, [tasks, filter])

  if (filteredTasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks found</p>
      </div>
    )
  }

  return (
    <Droppable droppableId="task-list">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`task-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
        >
          {filteredTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
})

TaskList.displayName = 'TaskList'

export default TaskList

