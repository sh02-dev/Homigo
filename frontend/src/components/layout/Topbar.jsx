export default function Topbar({title, right}){
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <div>{right}</div>
    </header>
  )
}
