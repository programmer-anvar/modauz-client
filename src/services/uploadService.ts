import api from './api'

export const uploadImageApi = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)
  // FormData = fayl yuborish uchun maxsus format

  const { data } = await api.post<{ url: string }>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
      // Rasm yuborish uchun bu header shart!
    }
  })

  return data.url
}