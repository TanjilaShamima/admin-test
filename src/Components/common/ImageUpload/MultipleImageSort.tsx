import React from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { EcGoodsType, ImageType } from '../../../../firebase/index'
import { UploadProgress } from '.'
import SingleImage from './SingleImage'

interface PropsTypes {
  images: ImageType[]
  handleSetMain: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  uploadProgress: UploadProgress
  onRemove: (url: string, index: number) => void
  uploadType: 'single' | 'multiple'
  error: string
  setEcGoods?: React.Dispatch<React.SetStateAction<EcGoodsType>>
}

const MultipleImageSort: React.FC<PropsTypes> = ({
  images,
  handleSetMain,
  uploadProgress,
  onRemove,
  uploadType,
  error,
  setEcGoods,
}) => {
  const sensors = [useSensor(PointerSensor, { activationConstraint: { distance: 10}})]

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over.id) {
      setEcGoods &&
        setEcGoods((prev: EcGoodsType) => {
          const oldIndex = prev.images.findIndex((image) => image.path === active.id)
          const newIndex = prev.images.findIndex((image) => image.path === over.id)
          return {
            ...prev,
            images: arrayMove(prev.images, oldIndex, newIndex),
          } as EcGoodsType
        })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={images && images?.map((images) => images.path)} strategy={rectSortingStrategy}>
        {images &&
          images.map((image, index) => (
            <SingleImage
              key={image.path}
              image={image}
              handleSetMain={handleSetMain}
              uploadProgress={uploadProgress}
              onRemove={onRemove}
              uploadType={uploadType}
              error={error}
              index={index}
            />
          ))}
      </SortableContext>
    </DndContext>
  )
}

export default MultipleImageSort
