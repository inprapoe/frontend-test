import React, { ReactNode } from 'react'
import styles from './MessageBox.module.css'

interface Props {
  children?: ReactNode
}

export default function MessageBox({ children }: Props) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
