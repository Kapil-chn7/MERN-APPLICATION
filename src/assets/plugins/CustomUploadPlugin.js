import axios from 'axios'
import { API } from '../../API'
import { isAutheticated } from '../../components/auth/authhelper'

const { token } = isAutheticated()

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const toBase64 = (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onload = () => resolve(reader.result)
              reader.onerror = (error) => reject(error)
            })

          return toBase64(file).then((cFile) => {
            this.loader.uploadedPercent = 40
            const formData = new FormData()
            formData.append('imageFile', file)
            return axios
              .post(`${API}/api/newsandevents/article/uploadimage`, formData, {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/formdata',
                },
              })
              .then((res) => {
                if (res.data.status) {
                  this.loader.uploaded = true
                  resolve({
                    default: res.data.url,
                  })
                } else {
                  reject(`Couldn't upload file: ${file.name}.`)
                }
              })
              .catch((err) => {
                reject(`Couldn't upload file: ${file.name}.`)
              })
          })
        }),
    )
  }
}

export default function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader)
  }
}
