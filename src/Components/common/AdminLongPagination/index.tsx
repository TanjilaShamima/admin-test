import React, { useEffect, useState } from 'react'
import styles from './AdminLongPagination.module.scss'

interface AdminLongPaginationProps {
  total: number
  current: number
  getPage: (page: number) => void
}

const AdminLongPagination: React.FC<AdminLongPaginationProps> = (props) => {
  const [pages, setPages] = useState<(number | string)[]>([])
  const [current, setCurrent] = useState(1)
  const [active, setActive] = useState(1)
  const total = props.total || 0
  const defaultRange = 4
  const middleOffset = 2
  const endRange = defaultRange - 1

  useEffect(() => {
    setCurrent(props.current + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getRange()
    setActive(current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  function genPages(start: number, end: number): number[] {
    const pages = []
    for (start > 0 ? start : 1; start <= end; start++) {
      pages.push(start)
    }
    return pages
  }

  function getRange() {
    if (total <= 5) {
      setPages(genPages(1, total))
      return
    }
    // starting range
    if (current < defaultRange) {
      setPages([...genPages(1, defaultRange), '...', ...genPages(total - endRange, total)])
      return
    }
    // end range
    if (total - middleOffset <= current) {
      if (current >= defaultRange) {
        setPages([...genPages(1, defaultRange), '...', ...genPages(total - endRange, total)])
        return
      }
    } else {
      // middle range
      if (current >= defaultRange) {
        setPages([1, '...', ...genPages(current - middleOffset, current + middleOffset), '...', total])
        return
      }
    }
  }

  function next() {
    if (current < total) {
      setCurrent((prev) => prev + 1)
      props.getPage(current + 1)
    }
  }

  function prev() {
    if (current > 1) {
      setCurrent((prev) => prev - 1)
      props.getPage(current - 1)
    }
  }

  function goTo(page: number | string) {
    if (page === '...') {
      return
    }
    setCurrent(Number(page))
    props.getPage(Number(page))
  }

  return (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={prev}>
          <img src="/images/common/prev.png" alt="next" />{' '}
        </button>
        <ul className={styles.pageItemWrapper}>
          {pages.map((page, index) => (
            <li
              onClick={() => goTo(page)}
              className={page === active ? `${styles.item} ${styles.active}` : styles.item}
              key={index}
            >
              {page}
            </li>
          ))}
        </ul>
        <button className={styles.button} onClick={next}>
          <img src="/images/common/next.png" alt="next" />{' '}
        </button>
      </div>
    </>
  )
}

export default AdminLongPagination
