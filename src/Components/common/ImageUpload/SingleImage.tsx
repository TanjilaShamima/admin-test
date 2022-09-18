import React from 'react'
import { UploadProgress } from '.'
import { ImageType } from '../../../../firebase/index'
import styles from './Image-upload.module.scss'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface PropsTypes {
  image: ImageType
  handleSetMain: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  uploadProgress: UploadProgress
  onRemove: (url: string, index: number) => void
  uploadType: 'single' | 'multiple'
  error: string
  index: number
}

const SingleImage: React.FC<PropsTypes> = ({
  image,
  handleSetMain,
  uploadProgress,
  onRemove,
  uploadType,
  error,
  index,
}) => {
  const { setNodeRef, attributes, listeners, transition, transform } = useSortable({ id: image.path })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <div key={image.path} className={styles.imageCard} ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {image.name ? (
        <progress
          key={image.name}
          className={styles.progress}
          value={uploadProgress[image.name]?.progress}
          max="100"
        ></progress>
      ) : (
        <div>
          <progress className={styles.progress} value={100} max="100"></progress>
        </div>
      )}
      <img src={image.path} alt="tepmpImages" />
      {!image.name ? (
        <>
          <div
            onClick={(event) => {
              event.stopPropagation()
              onRemove(image.path, index)
            }}
            className={styles.remove}
          >
            <span>x</span>
          </div>
          {uploadType === 'single' ? (
            ''
          ) : (
            <div style={{ background: error ? 'red' : '' }} className={styles.checkMainImage}>
              <input
                onChange={(event) => handleSetMain(event, index)}
                checked={image.main}
                className={styles.mainImageCheck}
                type="checkbox"
              />
            </div>
          )}
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default SingleImage
