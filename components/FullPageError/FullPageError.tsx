"use client"
import Button from '@/components/Button/Button'
import FullPage from '@/components/FullPage/FullPage'
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from './FullPageError.module.css'

interface Props {
  errorCode?: number,
  message?: string | number
}

export default function FullPageError({ errorCode, message }: Props) {

  const router = useRouter()

  const backToHomeHandler = () => {
    router.push('/')
  }

  return (
    <FullPage>
      <h1 className={styles.code}>
        {errorCode}
      </h1>
      <h2 className={styles.message}>{message}</h2>
      <Button className={styles.action} onClick={backToHomeHandler}>Back To Home</Button>
    </FullPage>
  )
}
