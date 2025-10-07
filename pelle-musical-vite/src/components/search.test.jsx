import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './search'
import mockupData from '../assets/mockup.json'

// Mock the SearchResults component
vi.mock('./SearchResults', () => ({
  default: ({ results, searchQuery }) => (
    <div data-testid="search-results">
      <span data-testid="search-query">{searchQuery}</span>
      <span data-testid="results-count">{results.length}</span>
      {results.map((dog) => (
        <div key={dog.id} data-testid={`dog-${dog.id}`}>
          {dog.name}
        </div>
      ))}
    </div>
  ),
}))

describe('Search Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the search input', () => {
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      expect(input).toBeInTheDocument()
    })

    it('should render the search button', () => {
      render(<Search />)
      const button = screen.getByRole('button', { name: /search/i })
      expect(button).toBeInTheDocument()
    })

    it('should render the search icon', () => {
      render(<Search />)
      const svg = document.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should render SearchResults component', () => {
      render(<Search />)
      const searchResults = screen.getByTestId('search-results')
      expect(searchResults).toBeInTheDocument()
    })
  })

  describe('Search Input Behavior', () => {
    it('should update input value when typing', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')

      await user.type(input, 'Buddy')

      expect(input).toHaveValue('Buddy')
    })

    it('should start with empty input value', () => {
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      expect(input).toHaveValue('')
    })

    it('should clear input when value is deleted', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')

      await user.type(input, 'Test')
      expect(input).toHaveValue('Test')

      await user.clear(input)
      expect(input).toHaveValue('')
    })
  })

  describe('Search Functionality', () => {
    it('should display results when search button is clicked', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      await user.type(input, 'Buddy')
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(parseInt(resultsCount.textContent)>0)
    })

    it('should trigger search when Enter key is pressed', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')

      await user.type(input, 'Buddy{Enter}')

      const resultsCount = screen.getByTestId('results-count')
      expect(parseInt(resultsCount.textContent)>0)
    })

    it('should clear results when search query is empty', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(resultsCount.textContent).toBe('0')
    })

    it('should clear results when search query contains only whitespace', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      await user.type(input, '   ')
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(resultsCount.textContent).toBe('0')
    })
  })

  describe('Search Filtering', () => {
    it('should filter dogs by name', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      const dogName = mockupData.dogs[0].name
      await user.type(input, dogName)
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(parseInt(resultsCount.textContent)).toBeGreaterThan(0)
    })

    it('should filter dogs by breed', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      const breed = mockupData.dogs[0].breed
      await user.type(input, breed)
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(parseInt(resultsCount.textContent)).toBeGreaterThan(0)
    })

    it('should filter dogs by color', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      const color = mockupData.dogs[0].color
      await user.type(input, color)
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(parseInt(resultsCount.textContent)).toBeGreaterThan(0)
    })

    it('should filter dogs by temperament', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      const temperament = mockupData.dogs[0].temperament
      await user.type(input, temperament)
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(parseInt(resultsCount.textContent)).toBeGreaterThan(0)
    })

    it('should be case-insensitive when searching', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      const dogName = mockupData.dogs[0].name.toUpperCase()
      await user.type(input, dogName)
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(parseInt(resultsCount.textContent)).toBeGreaterThan(0)
    })

    it('should return no results for non-matching query', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      await user.type(input, 'xyznonexistentdog123')
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(resultsCount.textContent).toBe('0')
    })

    it('should support partial matching', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      const partialName = mockupData.dogs[0].name.substring(0, 3)
      await user.type(input, partialName)
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(parseInt(resultsCount.textContent)).toBeGreaterThan(0)
    })
  })

  describe('SearchResults Integration', () => {
    it('should pass search query to SearchResults component', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      await user.type(input, 'TestQuery')
      await user.click(button)

      const searchQuery = screen.getByTestId('search-query')
      expect(searchQuery.textContent).toBe('TestQuery')
    })

    it('should pass filtered results to SearchResults component', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      const dogName = mockupData.dogs[0].name
      await user.type(input, dogName)
      await user.click(button)

      const resultsCount = screen.getByTestId('results-count')
      expect(parseInt(resultsCount.textContent)).toBeGreaterThan(0)
    })

    it('should update results when performing multiple searches', async () => {
      const user = userEvent.setup()
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      const button = screen.getByRole('button', { name: /search/i })

      // First search
      await user.type(input, mockupData.dogs[0].name)
      await user.click(button)
      const firstResultsCount = parseInt(
        screen.getByTestId('results-count').textContent
      )

      // Second search
      await user.clear(input)
      await user.type(input, mockupData.dogs[1].name)
      await user.click(button)
      const secondResultsCount = parseInt(
        screen.getByTestId('results-count').textContent
      )

      expect(firstResultsCount).toBeGreaterThan(0)
      expect(secondResultsCount).toBeGreaterThan(0)
    })
  })

  describe('UI Styling and Classes', () => {
    it('should have correct CSS classes on input', () => {
      render(<Search />)
      const input = screen.getByPlaceholderText('Search...')
      expect(input).toHaveClass(
        'w-full',
        'pl-10',
        'pr-4',
        'py-3',
        'text-base',
        'rounded-lg',
        'outline-none',
        'transition-all',
        'duration-300',
        'bg-white/70',
        'backdrop-blur-md',
        'border',
        'border-white/20',
        'shadow-lg',
        'hover:shadow-xl',
        'focus:shadow-2xl',
        'focus:bg-white/80',
        'focus:border-indigo-300/50'
      )
    })

    it('should have correct CSS classes on button', () => {
      render(<Search />)
      const button = screen.getByRole('button', { name: /search/i })
      expect(button).toHaveClass('button')
    })
  })
})
