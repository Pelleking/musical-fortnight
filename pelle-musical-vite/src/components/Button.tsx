import React from 'react'
import './Button.css'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      <span className="text">{children}</span>
    </button>
  )
}

export default Button
