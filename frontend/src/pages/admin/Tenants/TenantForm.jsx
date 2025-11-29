import { useState, useEffect } from 'react'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import { getRooms } from '../../../services/roomService'

export default function TenantForm({ onSubmit, initialValues = null }) {
  const [full_name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [room_id, setRoom] = useState(null)
  const [rooms, setRooms] = useState([])

  useEffect(() => { fetchRooms() }, [])
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.full_name || '')
      setPhone(initialValues.phone || '')
      setEmail(initialValues.email || '')
      setAddress(initialValues.address || '')
      setRoom(initialValues.room_id || null)
      // do not prefill password for security
      setPassword('')
    }
  }, [initialValues])

  async function fetchRooms() { try { const r = await getRooms(); setRooms(r || []) } catch (e) { console.error(e) } }

  function submit(e) {
    e.preventDefault()
    // basic client validation
    if (!full_name || !email || (!initialValues && !password)) {
      alert('Please provide name, email and password (password only required for new tenant)')
      return
    }
    // payload uses address field name (DB uses `address`)
    onSubmit({ full_name, phone, email, password, address, room_id })
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Full Name" value={full_name} onChange={e => setName(e.target.value)} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      {/* password required for new tenants only */}
      {!initialValues && (
        <Input label="Password (set for tenant)" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      )}

      <Input label="Address" value={address} onChange={e => setAddress(e.target.value)} />

      <Select
        label="Assign Room"
        value={room_id ?? ''}
        onChange={e => {
          const v = e.target.value;
          setRoom(v === '' ? null : Number(v));
        }}
      >

        <option value="">Select room</option>
        {rooms.map(r => <option key={r.id} value={r.id}>Room {r.room_number}</option>)}
      </Select>

      <div className="text-right">
        <button type="submit" className="px-5 py-2 rounded bg-gradient-to-b from-[#F46A47] to-[#E85A3C] text-white">Save</button>
      </div>
    </form>
  )
}
