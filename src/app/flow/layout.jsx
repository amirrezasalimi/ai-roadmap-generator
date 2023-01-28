import './globals.css'

export default function Layout({ children }) {
  return (
    <div>
      <h2>My Dashboard</h2>
      {children}
    </div>
  )
}
