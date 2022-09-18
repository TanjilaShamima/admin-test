import React, { useEffect } from 'react'

import 'react-quill/dist/quill.snow.css'
import styles from './editor.module.scss'
import { Delta, Sources } from 'quill'
import ReactQuill from 'react-quill'

const modules = {
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  toolbar: {
    container: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
            '#facccc',
            '#ffebcc',
            '#ffffcc',
            '#cce8cc',
            '#cce0f5',
            '#ebd6ff',
            '#bbbbbb',
            '#f06666',
            '#ffc266',
            '#ffff66',
            '#66b966',
            '#66a3e0',
            '#c285ff',
            '#888888',
            '#a10000',
            '#b26b00',
            '#b2b200',
            '#006100',
            '#0047b2',
            '#6b24b2',
            '#444444',
            '#5c0000',
            '#663d00',
            '#666600',
            '#003700',
            '#002966',
            '#3d1466',
            'custom-color',
          ],
        },
      ],
      // ['link', 'image', 'video'],
      ['clean'],
    ],
  },
}

type EditorType = {
  getHTML: (html: string) => void
  preview: boolean
  previewContent?: string
  isBodyText?: boolean
  mailMagazine?: boolean
}

export default function Editor(props: EditorType) {
  const editorRef = React.useRef(null)
  const QuillRef = React.useRef<any>()
  const [editorState, setEditorState] = React.useState<{ text: any }>({
    text: '',
  })

  /* --------------------------------- Methods -------------------------------- */

  const handleEditorState = (content: string, delta: Delta, source: Sources, editor: any) => {
    setEditorState({ text: content })
    props.getHTML(QuillRef.current?.state?.value)
  }

  /* ------------------------------- UseEffects ------------------------------- */

  useEffect(() => {
    if (props.preview) {
      setEditorState((prev) => ({
        ...prev,
        text: props.previewContent || prev.text,
      }))
    }
    // eslint-disable-next-line
  }, [props.preview])

  return (
    <>
      {props.preview ? (
        <ReactQuill value={props.previewContent} readOnly={true} theme="bubble" />
      ) : (
        <>
          <ReactQuill
            style={{ border: props.mailMagazine && !props.isBodyText ? '1px solid red' : undefined }}
            className={styles.ecEditor}
            ref={(element) => {
              if (element !== null) {
                QuillRef.current = element
              }
            }}
            modules={modules}
            value={editorState.text}
            onChange={handleEditorState}
          />
          {props.mailMagazine && !props.isBodyText && <p style={{ color: 'red' }}>必須です</p>}
        </>
      )}
    </>
  )
}
