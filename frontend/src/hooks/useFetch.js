import { useState, useEffect } from 'react'

export default function useFetch(fetcher, deps = []){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    fetcher().then(res=>{
      if(mounted){ setData(res); setError(null) }
    }).catch(err=>{ if(mounted) setError(err) }).finally(()=>{ if(mounted) setLoading(false) })
    return ()=> mounted = false
  }, deps)

  return { data, loading, error }
}
