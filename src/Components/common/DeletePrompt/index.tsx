import React from 'react'
import DeletePromptStyles from './DeletePrompt.module.scss'

interface DeletePromptProps {
  setDeleteModal: (pram: boolean) => void
  handleDeleteConfirm: () => void
}

const DeletePrompt: React.FC<DeletePromptProps> = ({ setDeleteModal, handleDeleteConfirm }) => {
  const deleteRef = React.useRef<HTMLButtonElement>(null)
  return (
    <div className={DeletePromptStyles.mainDeleteWrapper}>
      <div className={DeletePromptStyles.deleteWrapper}>
        <h4 className={DeletePromptStyles.deleteTitle}>削除します。よろしいですか。</h4>
        <div className={DeletePromptStyles.buttonContainer}>
          <button
            data-test-id="delete"
            className={DeletePromptStyles.confirmButton}
            onClick={() => {
              if (deleteRef.current) {
                deleteRef.current.disabled = true
                handleDeleteConfirm()
                deleteRef.current.disabled = false
              }
            }}
            ref={deleteRef}
          >
            はい
          </button>
          <button
            data-test-id="cancel"
            className={DeletePromptStyles.cancelButton}
            onClick={() => setDeleteModal(false)}
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePrompt
