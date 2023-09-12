import React from 'react'
import styles from './Button.module.css'
import { FaSpinner } from 'react-icons/fa'

interface Props {
  children?: React.ReactNode
  className?: string,
  type?: "button" | "submit" | "reset" | undefined
  loading?: boolean,
  disabled?: boolean | string | number ,
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({
  children,
  className = '',
  disabled,
  loading,
  type,
  onClick
}: Props) {

  return (
    loading || disabled ? (
      <div className={`${styles.btn} ${className}`} aria-label={disabled ? 'disabled' : ''}>
        {loading ? (
          <FaSpinner className={'text-2xl animate-spin'}/>
        ) : (
          children
        )}
      </div>
    ) : (
      <button className={`${styles.btn} ${className}`} type={type} onClick={onClick}>
        {children}
      </button>
    )
  )
}
