export default function Button({children, className='', ...props}){
  return (
    <button className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${className}`} {...props}>
      {children}
    </button>
  )
}
