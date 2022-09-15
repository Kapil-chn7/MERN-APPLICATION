import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function CmsEditor() {
  const [ckeditorData, updateditorData] = useState('')

  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log('Editor is ready to use!', editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
      />
    </div>
  )
}
