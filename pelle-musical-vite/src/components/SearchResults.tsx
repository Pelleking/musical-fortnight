interface Dog {
  id: number
  name: string
  breed: string
  age: number
  color: string
  weight: number
  temperament: string
}

interface SearchResultsProps {
  results: Dog[]
  searchQuery: string
}

const SearchResults = ({ results, searchQuery }: SearchResultsProps) => {
  return (
    <>
      {results.length > 0 && (
        <div className="w-full space-y-3">
          {results.map((dog) => (
            <div
              key={dog.id}
              className="p-4 rounded-lg transition-all duration-300 bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/80 hover:border-indigo-300/50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {dog.name}
                  </h3>
                  <p className="text-gray-600">{dog.breed}</p>
                </div>
                <span className="text-sm text-gray-500">{dog.age} years old</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Color: {dog.color}</p>
                <p>Weight: {dog.weight} lbs</p>
                <p className="mt-1 italic">{dog.temperament}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchQuery && results.length === 0 && (
        <div className="w-full p-4 text-center text-gray-500 rounded-lg bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
          No dogs found matching "{searchQuery}"
        </div>
      )}
    </>
  )
}

export default SearchResults
