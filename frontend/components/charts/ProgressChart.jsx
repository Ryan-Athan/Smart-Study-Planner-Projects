import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { subject: 'Math', progress: 75 },
  { subject: 'Science', progress: 60 },
  { subject: 'History', progress: 45 },
  { subject: 'English', progress: 80 },
]

export default function ProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="progress" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}