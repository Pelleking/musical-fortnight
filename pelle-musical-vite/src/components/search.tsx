const search = () => {
  return (
    <input
      type="text"
      placeholder="Search..."
      style={{
        padding: '12px 20px',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
      }}
      onFocus={(e) => e.target.style.borderColor = '#646cff'}
      onBlur={(e) => e.target.style.borderColor = '#ddd'}
    />
  )
}

export default search
