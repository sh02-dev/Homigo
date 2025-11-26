import { useEffect, useState } from 'react'
import { getTenants, createTenant } from '../../../services/tenantService'
import Card from '../../../components/ui/Card'
import Modal from '../../../components/ui/Modal'
import TenantForm from './TenantForm'

export default function TenantsList(){
  const [tenants, setTenants] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(()=>{ fetch() },[])
  async function fetch(){ const data = await getTenants(); setTenants(data || []) }
  async function onCreate(payload){ await createTenant(payload); setOpen(false); fetch() }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tenants</h2>
        <button className="bg-purple-600 px-4 py-2 rounded" onClick={()=>setOpen(true)}>+ Add New Tenant</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {tenants.length===0 && <div className="text-gray-400">No tenants yet</div>}
        {tenants.map(t=> (
          <Card key={t.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center font-bold">{t.full_name?.[0]||'A'}</div>
              <div>
                <div className="font-semibold">{t.full_name}</div>
                <div className="text-sm text-gray-400">{t.email}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Add New Tenant">
        <TenantForm onSubmit={onCreate} />
      </Modal>
    </div>
  )
}
