import React from 'react'
import { deleteImage, EcGoodsType, ImageType, UploadDirs, uploadImagesWithProgress } from '../../../../firebase/index'
import app from '../../../../firebase'
import styles from './Image-upload.module.scss'
import { TENANT_ID } from '../../../../config/paths'
import { toast } from 'react-toastify'
import { getDownloadURL } from 'firebase/storage'
import { getDirfrmImageId, getDirfrmImageUrl } from '../../../../utils'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { getCopyProducts, removeCopyProducts } from '../../../../firebase/duplicateProducts'
import UploadProgressBar from '../UploadProgressBar'
import MultipleImageSort from './MultipleImageSort'

export type UploadProgress = {
  [x: string]: {
    progress: number
    storageUrl: string
  }
}

export type ImageUploadType = {
  getImage: (images: ImageType[]) => void
  resetError: () => void
  getUploadStatus: (isUploading: boolean) => void
  images: ImageType[]
  error: string
  uploadType: 'single' | 'multiple'
  dir: UploadDirs
  ratio?: number
  crop?: boolean
  productId?: string
  isCopy?: boolean
  slider?: boolean
  required?: boolean
  setEcGoods?: React.Dispatch<React.SetStateAction<EcGoodsType>>
}
export default function ImageUpload(props: ImageUploadType) {
  const [uploadProgress, setUploadProgress] = React.useState<UploadProgress>({})
  // cropper
  const [cropper, setCropper] = React.useState<Cropper>()
  const [cropperImage, setCropperImage] = React.useState<{ url: string; name: string }>({ url: '', name: '' })
  const [croping, setCroping] = React.useState<boolean>(false)
  const [cropImage, setCropImage] = React.useState<boolean>(false)
  const [progress, setProgress] = React.useState<number>(0)

  function processUpload(file: File, images: ImageType[]): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const upload = uploadImagesWithProgress(app, TENANT_ID, props.dir, file)
        upload.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: {
                progress,
                storageUrl: '',
              },
            }))
          },
          (error) => {
            toast.error(`failed to upload ${file.name}`)
            reject('failed to upload')
          },
          async () => {
            const fileUrl = await getDownloadURL(upload.snapshot.ref)
            resolve(fileUrl)
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: {
                ...prev[file.name],
                storageUrl: fileUrl,
              },
            }))
          },
        )
      } catch (error) {
        console.log('upload error', error)
        reject('upload error')
      }
    })
  }
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let tempImages: ImageType[] = [...props.images]
    const files = event.target.files
    const allowedExtensions = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    if (files) {
      if (!allowedExtensions.test(files[0].name)) {
        toast.error('間違ったファイル形式!')
        event.target.value = ''
        return
      }
      if (props.crop) {
        // remove previous image
        tempImages = []
        const file = files[0]
        const url = URL.createObjectURL(file)
        tempImages.push({
          path: url,
          main: false,
          name: file.name,
          file: file,
        })
        props.resetError()
        setCroping(true)
        props.getImage(tempImages)
        props.getUploadStatus(true)
        return
      }

      for (const file of files) {
        const url = URL.createObjectURL(file)
        tempImages.push({
          path: url,
          main: false,
          name: file.name,
          file: file,
        })
      }
      props.resetError()
      props.getImage(tempImages)
      props.getUploadStatus(true)
      const uploaded = tempImages.filter((image) => !image.file)
      const uploads = tempImages.filter((image) => image.file)
      const urls = []
      for (const image of uploads) {
        if (image.file) {
          let url = await processUpload(image.file, uploads)
          urls.push({ path: url, main: false })
        }
      }
      props.getImage([...uploaded, ...urls])
      props.getUploadStatus(false)
      setCropImage(false)
    }
  }

  const onRemove = async (url: string, index: number) => {
    try {
      const { dir, file } = getDirfrmImageUrl(url)
      const images = [...props.images]
      images.splice(index, 1)
      props.getImage(images)
      if (!props.isCopy) {
        await getCopyProducts(app, TENANT_ID, getDirfrmImageId(url)).then((response) => {
          if (!(response.length > 1 && props.productId)) {
            deleteImage(app, TENANT_ID, dir as UploadDirs, file)
          }
          if (response.length) {
            removeCopyProducts(app, TENANT_ID, getDirfrmImageId(url), props.productId || '')
          }
        })
      }
    } catch (error) {
      toast.error('削除できませんでした')
    }
  }

  const handleSetMain = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    event.stopPropagation()
    let images = [...props.images]
    let imagesToggleMain = images.map((item: ImageType, pos: number) => {
      if (pos === index) {
        props.resetError()
        return {
          ...item,
          main: event.target.checked,
        }
      } else {
        return {
          ...item,
          main: false,
        }
      }
    })

    props.getImage(imagesToggleMain)
  }
  // Image Cropping
  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',')
    const first = arr[0]
    if (!first) {
      throw new Error()
    }
    const matches = first.match(/:(.*?);/)
    if (!matches) {
      throw new Error()
    }
    const mime = matches[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  React.useEffect(() => {
    if (props.uploadType === 'single') {
      if (cropperImage.url !== '') {
        const croppedCanvas = dataURLtoFile(cropperImage.url, cropperImage.name)
        const url = URL.createObjectURL(croppedCanvas)
        const file = {
          path: url,
          main: false,
          name: croppedCanvas.name,
          file: croppedCanvas,
        }
        props.getImage([file])
        processUpload(croppedCanvas, [file]).then((url) => {
          props.getImage([{ path: url, main: true }])
          props.getUploadStatus(false)
          setCropImage(false)
        })
      }
    }
    //eslint-disable-next-line
  }, [cropperImage])

  const getCropData = (name: string) => {
    if (typeof cropper !== 'undefined') {
      setCropperImage({ url: cropper.getCroppedCanvas().toDataURL(), name: name })
      setCropImage(true)
      setCroping(false)
    }
  }
  return (
    <>
      <div className={props.slider ? styles.inputSliderImage : styles.inputWrapper}>
        <label htmlFor="">画像 {props.required && <span style={{ color: 'red' }}>※</span>}</label>
        <input type="file" onChange={handleFileChange} multiple={props.uploadType === 'multiple' ? true : false} />
      </div>
      {croping ? (
        <div>
          <Cropper
            style={{ height: 300, width: '70%', marginLeft: '30%' }}
            zoomTo={0.5}
            aspectRatio={props.ratio}
            preview=".img-preview"
            src={props.images[0]?.path}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance)
            }}
            guides={true}
          />
          <div className={styles.cropButton}>
            <button onClick={() => getCropData(props.images[0]?.name || '')}>Crop Image</button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.imageWrapper}>
            <MultipleImageSort
              images={props.images}
              handleSetMain={handleSetMain}
              uploadProgress={uploadProgress}
              onRemove={onRemove}
              uploadType={props.uploadType}
              error={props.error}
              setEcGoods={props.setEcGoods}
            />
          </div>
          {cropImage && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '30%' }}>Upload Completed:</div> <UploadProgressBar completed={progress} />
            </div>
          )}
        </>
      )}

      {props.error && <p className={styles.errorMessage}>{props.error}</p>}
    </>
  )
}
