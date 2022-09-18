import React from 'react'
import styles from './Loader.module.scss'

type PropsTypes = {
  size: string
  thickness: string
  circileColor?: string
  spinnerColor?: string
}

export type StyleObj = {
  width: string
  height: string
  border?: string
  borderTop?: string
}
const Loader: React.FC<PropsTypes> = (props) => {
  const styleObj: StyleObj = {
    width: props.size,
    height: props.size,
  }

  if (props.circileColor) {
    styleObj.border = `${props.thickness} solid ${props.circileColor}`
  } else {
    styleObj.border = `${props.thickness} solid rgb(179, 175, 175)`
  }

  if (props.spinnerColor) {
    styleObj.borderTop = `${props.thickness} solid ${props.spinnerColor}`
  } else {
    styleObj.borderTop = `${props.thickness} solid #313030`
  }

  return <div className={styles.loader} style={styleObj}></div>
}

export default Loader
