import React, { ReactNode } from 'react'
import styles from './Card.module.css'

interface Props {
  className?: string,
  children?: ReactNode
}

export default function Card({ children, className = '' }: Props) {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  )
}
