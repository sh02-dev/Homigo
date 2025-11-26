export default function RoomCard({room}){
  return (
    <div className="panel p-4">
      <div className="font-semibold">Room {room.room_number}</div>
      <div className="text-sm text-gray-400">{room.room_type} • ₹{room.monthly_rent}</div>
    </div>
  )
}
