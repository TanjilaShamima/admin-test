import React, { useEffect } from 'react'
import styles from './PlainTextInput.module.scss'

type OptionType = {
  name: string
  value: string
}

type PropsTypes = {
  disabled?: boolean
  label?: string
  name: string
  placeholder: string
  type: 'text' | 'number' | 'email' | 'select' | 'textarea' | 'date' | 'password'
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  error?: string
  labelPos?: 'top' | 'left'
  options?: OptionType[]
  rows?: number
  maxLength?: number
  max?: string
  min?: string
  required?: boolean
  readonly?: boolean
}

const PlainTextInput: React.FC<PropsTypes> = (props) => {
  const [showError, setShowError] = React.useState(false)

  /* --------------------------------- Methods -------------------------------- */

  /* ------------------------------- UseEffects ------------------------------- */

  useEffect(() => {
    if (props.value) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }, [props.value])

  const renderInput = (type: 'text' | 'number' | 'email' | 'select' | 'textarea' | 'date' | 'password') => {
    switch (type) {
      case 'select':
        return (
          <select
            disabled={props.disabled ? true : false}
            className={props.error ? styles.error : ''}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
          >
            <option>{props.placeholder || 'select'}</option>
            {props.options &&
              props.options.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                )
              })}
          </select>
        )
        return

      case 'textarea':
        return (
          <textarea
            style={{ height: 'auto' }}
            disabled={props.disabled ? true : false}
            className={props.error ? styles.error : ''}
            rows={props.rows}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
          />
        )
      case 'date':
        return (
          <input
            disabled={props.disabled ? true : false}
            className={props.error ? styles.error : ''}
            type={props.type}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            max={props.max ? props.max : ''}
            min={props.min ? props.min : ''}
          />
        )

      case 'email':
      case 'number':
        return (
          <input
            disabled={props.disabled ? true : false}
            className={props.error ? styles.error : ''}
            type={props.type}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            readOnly={props.readonly ? true : false}
          />
        )

      default:
        return (
          <input
            disabled={props.disabled ? true : false}
            className={props.error ? styles.error : ''}
            type={props.type}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            readOnly={props.readonly ? true : false}
          />
        )
    }
  }

  return (
    <div style={{ flexDirection: props.labelPos === 'top' ? 'column' : 'row' }} className={styles.inputContainer}>
      {props.label && (
        <label className={styles.label}>
          {props.label}
          {props.required && <span style={{ color: 'red' }}> *</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {renderInput(props.type)}
        {props.error && <div className={styles.errorText}>{props.error}</div>}
        {props.maxLength && showError && <div>{props.maxLength - props.value.toString().length} characters left.</div>}
      </div>
    </div>
  )
}

export default PlainTextInput
