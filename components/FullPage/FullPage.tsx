import React, { ReactNode } from 'react'
import styles from './FullPage.module.css'

interface Props {
  children?: ReactNode
}

export default function FullPage({ children }: Props) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
