import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import FullPage from '../FullPage/FullPage'

interface Props {
  label?: string
}

export default function Loading({ label }: Props) {
  return (
    <FullPage>
      <div className="mb-5">
        <FaSpinner className={'text-5xl animate-spin text-blue-700'}/>
      </div>
      {label && (
        <span>
          {label}
        </span>
      )}   
    </FullPage>
  )
}
