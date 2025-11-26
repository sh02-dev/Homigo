export default function Card({children, className=''}){
  return <div className={`panel p-4 ${className}`}>{children}</div>
}
