function search() {
  const dogs = [
    {
      id: 1,
      name: "Golden Retriever",
      size: "Large",
      temperament: "Friendly, Intelligent, Devoted",
      energy: "High",
      lifespan: "10-12 years"
    },
    {
      id: 2,
      name: "Labrador Retriever",
      size: "Large",
      temperament: "Outgoing, Even Tempered, Gentle",
      energy: "High",
      lifespan: "10-12 years"
    },
    {
      id: 3,
      name: "German Shepherd",
      size: "Large",
      temperament: "Confident, Courageous, Smart",
      energy: "High",
      lifespan: "9-13 years"
    },
    {
      id: 4,
      name: "Bulldog",
      size: "Medium",
      temperament: "Calm, Friendly, Courageous",
      energy: "Low",
      lifespan: "8-10 years"
    },
    {
      id: 5,
      name: "Beagle",
      size: "Small",
      temperament: "Gentle, Even Tempered, Determined",
      energy: "Medium",
      lifespan: "12-15 years"
    },
    {
      id: 6,
      name: "Poodle",
      size: "Medium",
      temperament: "Intelligent, Active, Alert",
      energy: "High",
      lifespan: "12-15 years"
    }
  ];

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
