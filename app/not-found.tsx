"use client"
import FullPageError from '@/components/FullPageError/FullPageError'
import React from 'react'

export default function NotFoundPage() {

  return (
    <FullPageError errorCode={404} message={'Page Not Found'}/>
  )
}
