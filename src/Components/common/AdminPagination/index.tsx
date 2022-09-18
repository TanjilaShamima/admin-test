import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import PaginationStyle from './AdminPagination.module.scss'

type PaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  pages: number
  url?: string
}

const AdminPagination: React.FC<PaginationProps> = ({ setPage, currentPage, pages, url }) => {
  const router = useRouter()
  return (
    <div className={PaginationStyle.paginationWrapper}>
      <ul className={PaginationStyle.paginationButton}>
        {Array(pages)
          .fill(0)
          .map((item, index) => {
            return (
              <li
                key={index}
                className={currentPage === index ? PaginationStyle.buttonHere : PaginationStyle.button}
                onClick={() => {
                  router.push({ pathname: router.pathname, query: { ...router.query, page: index + 1 } })
                  setPage(index)
                }}
              >
                <a className={PaginationStyle.nextPage}>
                  <span className={PaginationStyle.pageText}>{index + 1}</span>
                </a>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default AdminPagination
