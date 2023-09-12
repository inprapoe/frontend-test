import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import FullPage from '../FullPage/FullPage'
import { motion } from "framer-motion"

interface Props {
  label?: string
}

export default function Loading({ label }: Props) {
  return (
    <FullPage>
      <motion.div 
        className='flex items-center flex-col'
        initial="hidden"
        animate="show"
        variants={{
          hidden: {
            opacity: 0,
            translateY: 10
          },
          show: {
            opacity: 1,
            translateY: 0
          }
        }}
        
      >
        <div className="mb-5">
          <FaSpinner className={'text-5xl animate-spin text-blue-700'}/>
        </div>
        {label && (
          <span>
            {label}
          </span>
        )}
      </motion.div>      
    </FullPage>
  )
}
