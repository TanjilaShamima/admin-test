import React from 'react'
import styles from './AdminModal.module.scss'

type PropsTypes = {
  open: boolean
  onClose: () => void
  headerText: string
  delete?: boolean
  children?: any
}

const AdminModal: React.FC<PropsTypes> = (props) => {
  return (
    <div className={`${props.open ? styles.modal : styles.notActiveModal} modal_cart-in`}>
      {props.delete ? (
        <div className={styles.modalWrapDelete}>
          <div className={styles.deleteModalBody}>{props.children}</div>
        </div>
      ) : (
        <div className={styles.modalWrap}>
          <div className={styles.modalWrapMain}>
            {' '}
            {/** modal_scroller  className removed */}
            <div className="">
              {' '}
              {/** modal_inner  className removed */}
              <div className="block">
                <header className="head tc">
                  <h3 className={styles.modalWrapHeader}>{props.headerText}</h3>
                </header>
                <div className={styles.modalWrapBody}>{props.children}</div>
              </div>
            </div>
          </div>
          <div className={`${styles.btnClose} `}>
            <div
              className="a"
              onClick={() => {
                props.onClose()
              }}
            >
              <div className={styles.cross}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminModal
