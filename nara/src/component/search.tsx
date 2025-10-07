
function search() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4">
        <input placeholder='sök' className='border-2 border-green-300 rounded-md p-2 outline-none'/>
        <button className='bg-green-500 text-white rounded-md p-2 hover:bg-green-600'>
          Sök
        </button>
      </div>
    </div>
  )
}

export default search
