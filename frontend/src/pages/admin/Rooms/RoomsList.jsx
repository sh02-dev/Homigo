import { useState, useEffect } from 'react'
import Card from '../../../components/ui/Card'
import Modal from '../../../components/ui/Modal'
import RoomForm from './RoomForm'
import { getRooms, createRoom, deleteRoom } from '../../../services/roomService'

export default function RoomsList(){
  const [rooms, setRooms] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(()=>{ fetchRooms() },[])
  async function fetchRooms(){ const data = await getRooms(); setRooms(data || []) }
  async function onCreate(payload){ await createRoom(payload); setOpen(false); fetchRooms() }
  async function onDelete(id){ if(!confirm('Delete room?')) return; await deleteRoom(id); fetchRooms() }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Room Management</h2>
        <button className="bg-purple-600 px-4 py-2 rounded" onClick={()=>setOpen(true)}>+ Add New Room</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.length===0 && <div className="text-gray-400">No rooms yet</div>}
        {rooms.map(r=> (
          <Card key={r.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold">Room {r.room_number}</div>
                <div className="text-sm text-gray-400">{r.room_type} • Floor {r.floor}</div>
              </div>
              <div>
                <button className="px-3 py-1 bg-white/5 rounded mr-2">Edit</button>
                <button className="px-3 py-1 bg-red-600 rounded" onClick={()=>onDelete(r.id)}>Delete</button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Add New Room">
        <RoomForm onSubmit={onCreate} />
      </Modal>
    </div>
  )
}
