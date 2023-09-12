"use client"; // This is a client component 👈🏽
import React, { ChangeEvent, FocusEvent, useState} from 'react'
import styles from './Input.module.css'

interface InputProps {
  className?: string,
  type?: 'text' | 'number' | 'email' | 'password'
  label?: string
  value: string | number
  name: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void // eslint-disable-line no-unused-vars
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void // eslint-disable-line no-unused-vars
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void // eslint-disable-line no-unused-vars
}

interface Props {
  className?: string
  containerClassName?: string
  inputProps?: InputProps
  label?: string,
  error?: string | number
}

export default function Input({
  containerClassName = '',
  className = '',
  inputProps,
  label,
  error
}: Props) {

  const [isFocus, setIsFocus] = useState<boolean>(false)

  function onFocusHandler(e: FocusEvent<HTMLInputElement>) {
    setIsFocus(true)
    inputProps?.onFocus && inputProps?.onFocus(e)
  } 

  function onBlurHandler(e: FocusEvent<HTMLInputElement>) {
    setIsFocus(false)
    inputProps?.onBlur && inputProps?.onBlur(e)
  } 
  
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.input__container} ${className}`} aria-label={error ? 'error' : isFocus ? 'focus' : ''}>
        <input 
          {...inputProps} 
          className={`${styles.input} ${inputProps?.className || ''}`}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      </div>
      {error && (
        <p className='text-xs text-red-600'>{error}</p>
      )}
    </div>
  )
}
