import './app.css'
import Search from './components/Search'

function App() {
  const handleSearch = (query: string) => {
    console.log('Search query:', query)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Search onSearch={handleSearch} placeholder="Search..." />
      </div>
    </>
  )
}
export default App
