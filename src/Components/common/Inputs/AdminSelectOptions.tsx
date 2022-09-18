import React, { useEffect } from 'react'
import styles from './AdminSlectOption.module.scss'
export type AdminSelectOptionType = {
  label: string
  value: string | number
}
type PropsTypes = {
  options: AdminSelectOptionType[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  selectedValue: string | number
  error?: boolean
  setSelectedCategory?: (value: string) => void
  saveGood?: boolean
  errorText?: string
}

const AdminSelectOption: React.FC<PropsTypes> = (props) => {
  /* --------------------------------- Methods -------------------------------- */

  /* ------------------------------- UseEffects ------------------------------- */

  useEffect(() => {
    props.setSelectedCategory && props.setSelectedCategory(props.selectedValue as string)
  }, [props])

  return (
    <div className={props.saveGood ? styles.selectWrapper : styles.selectWrap}>
      <select
        name="order"
        onChange={props.onChange}
        value={props.selectedValue}
        className={`${styles.select} ${props.error ? styles.error : ''}`}
      >
        {props.options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {props.error && <span className={styles.errorText}>{props.errorText}</span>}
    </div>
  )
}

export default AdminSelectOption
