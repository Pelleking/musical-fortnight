import { useState, useMemo, useCallback } from 'react'
import mockupData from '../assets/mockup.json'
import SearchResults from './searchResults'
import Button from './button'

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
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 3

  const filterDogs = useCallback((query: string): Dog[] => {
    if (!query.trim()) {
      return []
    }

    const lowerQuery = query.toLowerCase()
    return mockupData.dogs.filter((dog) => {
      return (
        dog.name.toLowerCase().includes(lowerQuery) ||
        dog.breed.toLowerCase().includes(lowerQuery) ||
        dog.color.toLowerCase().includes(lowerQuery) ||
        dog.temperament.toLowerCase().includes(lowerQuery)
      )
    })
  }, [])

  const handleSearch = useCallback(() => {
    const filtered = filterDogs(searchQuery)
    setResults(filtered)
    setCurrentPage(1)
  }, [searchQuery, filterDogs])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const totalPages = Math.ceil(results.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const paginatedResults = results.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl gap-4">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-2xl w-full pt-4 pb-4 bg-gray-50/95 backdrop-blur-sm z-50 flex flex-col items-center gap-4">
        <div className="flex items-center w-full gap-2 px-4">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10"
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
              className="w-full pl-10 pr-4 py-3 text-base rounded-lg outline-none transition-all duration-300 bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl focus:shadow-2xl focus:bg-white/80 focus:border-indigo-300/50"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-4 px-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg transition-all duration-300 bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/80 hover:border-indigo-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:bg-white/70 disabled:hover:border-white/20"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg transition-all duration-300 bg-white/70 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/80 hover:border-indigo-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:bg-white/70 disabled:hover:border-white/20"
            >
              Next
            </button>
          </div>
        )}

        <div className="w-full px-4">
          <SearchResults results={paginatedResults} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}

export default search
