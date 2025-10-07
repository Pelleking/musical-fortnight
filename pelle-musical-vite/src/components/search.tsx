import { useState } from 'react'
import mockupData from '../assets/mockup.json'
import SearchResults from './SearchResults'

interface Dog {
  id: number
  name: string
  breed: string
  age: number
  color: string
  weight: number
  temperament: string
}

const search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Dog[]>([])

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const filtered = mockupData.dogs.filter((dog) => {
      const query = searchQuery.toLowerCase()
      return (
        dog.name.toLowerCase().includes(query) ||
        dog.breed.toLowerCase().includes(query) ||
        dog.color.toLowerCase().includes(query) ||
        dog.temperament.toLowerCase().includes(query)
      )
    })

    setResults(filtered)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl gap-4">
      <div className="flex items-center w-full gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 text-base border-2 border-gray-300 rounded-lg outline-none transition-colors focus:border-indigo-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Search
        </button>
      </div>

      <SearchResults results={results} searchQuery={searchQuery} />
    </div>
  )
}

export default search
