import './app.css'
import Search from './components/Search'
import { useState, useEffect } from 'react'
import searchData from './data/searchData.json'

interface SearchItem {
  id: number
  title: string
  category: string
  description: string
}

function App() {
  const [data, setData] = useState<SearchItem[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchItem[]>([])

  useEffect(() => {
    setData(searchData)
    setFilteredResults(searchData)
  }, [])

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredResults(data)
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const results = data.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery)
    )
    
    setFilteredResults(results)
    console.log('Search query:', query, 'Results:', results.length)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Search</h1>
            <Search onSearch={handleSearch} placeholder="Search products..." />
          </div>

          <div className="mt-8">
            <p className="text-gray-600 mb-4">
              Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                    {item.category}
                  </span>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No results found. Try a different search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default App
