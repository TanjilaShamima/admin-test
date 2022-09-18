import React from 'react'
import styles from './backdrop.module.scss'

type PropsTypes = {
  open: boolean
}

const AdminBackDrop: React.FC<PropsTypes> = (props) => {
  return (
    <div className={props.open ? styles.loaderContainer : styles.hide}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default AdminBackDrop
