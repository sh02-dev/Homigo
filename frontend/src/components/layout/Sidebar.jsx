import { NavLink } from 'react-router-dom'

function LinkItem({to, children}){
  return (
    <NavLink to={to} className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive? 'bg-purple-600/80 text-white':'text-gray-300 hover:bg-white/2'}`}>
      {children}
    </NavLink>
  )
}

export default function Sidebar(){
  return (
    <aside className="w-64 h-screen sticky top-0 p-6 bg-gradient-to-b from-[#071026] to-[#06101a]">
      <div className="mb-8">
        <div className="text-2xl font-bold text-purple-400">PG Manager</div>
        <div className="text-xs text-gray-400">Hostel Management</div>
      </div>
      <nav className="space-y-2">
        <LinkItem to="/admin/dashboard">Dashboard</LinkItem>
        <LinkItem to="/admin/rooms">Rooms</LinkItem>
        <LinkItem to="/admin/tenants">Tenants</LinkItem>
        <LinkItem to="/admin/rent">Rent</LinkItem>
        <LinkItem to="/admin/complaints">Complaints</LinkItem>
      </nav>
      <div className="mt-auto text-sm text-gray-400">Logout</div>
    </aside>
  )
}
