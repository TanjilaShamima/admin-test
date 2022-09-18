import React, { useEffect } from 'react'
import styles from './AdminMenu.module.scss'
import router, { useRouter } from 'next/router'

export type CustomPageType = {
  id?: string
  pageName: string
  pageId: string
  contents: string
  createdAt?: Date
}


export type MenuItem = {
  name: string
  link: string
  submenus?: MenuItem[]
}

const AdminMenu: React.FC = () => {
  const route = useRouter()
  const [activeMenu, setActiveMenu] = React.useState('')





  const menus: MenuItem[] = [
    {
      name: 'Categories',
      link: '/categories',
    },
    {
      name: 'Course',
      link: '/course',
    },
  ]

  /* --------------------------------- Methods -------------------------------- */


  /* ------------------------------- UseEffects ------------------------------- */

  useEffect(() => {
    setActiveMenu(route.asPath)
  }, [route.asPath])


  return (
    <div className={styles.menuWrapper}>
      {menus.map((item, index) => (
        <>
          <div
            key={index}
            className={`${styles.menuItems} ${item.link === activeMenu ? styles.activeMenu : ''}`}
            onClick={() => {
              router.push(item.link)
            }}
          >
            {item.name}
          </div>
        </>
      ))}
    </div>
  )
}

export default AdminMenu
