import { useState, useEffect } from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ limit }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json()
      setTasks(limit ? data.slice(0, limit) : data)
    } catch (error) {
      console.error('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading tasks...</div>
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center py-4">No tasks found</p>
      )}
    </div>
  )
}