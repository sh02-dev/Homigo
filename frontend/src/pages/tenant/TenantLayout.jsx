import { Outlet, Link } from 'react-router-dom'

export default function TenantLayout(){
  return (
    <div className="flex">
      <aside className="w-64 p-6 bg-gradient-to-b from-[#071026] to-[#06101a]">
        <div className="text-2xl font-bold text-purple-400 mb-6">PG Manager</div>
        <nav className="space-y-2">
          <Link to="/tenant/dashboard" className="block py-2 px-3 rounded bg-white/2">Dashboard</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
