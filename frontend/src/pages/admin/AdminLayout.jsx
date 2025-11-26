import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'
import Topbar from '../../components/layout/Topbar'

export default function AdminLayout(){
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <Topbar title="Admin" />
        <Outlet />
      </main>
    </div>
  )
}
