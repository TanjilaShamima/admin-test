import React from 'react'
import styles from './AdminTabs.module.scss'
export type AdminTabType = 'category' | 'subcategory' | 'savedecgoods' | 'addecgoods'
type TabMenu = {
  name: AdminTabType
  label: string
}

type PropsTypes = {
  menus: TabMenu[]
  onTabChange: (param: AdminTabType) => void
  active: AdminTabType
}

const AdminTabs: React.FC<PropsTypes> = (props) => {
  return (
    <div className={styles.tabControl}>
      <div className={styles.tabs}>
        {props.menus.map((item, index) => (
          <div
            data-test-id='tab-menu'
            onClick={() => {
              props.onTabChange(item.name)
            }}
            className={`${styles.tabBtn} ${item.name === props.active ? `${styles.activeTab}` : ''} `}
            key={index}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminTabs
