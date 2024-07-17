export const FormValidate = async formData => {
  const errors = {}

  const trimmedFormData = {}
  for (const key in formData) {
    trimmedFormData[key] = formData[key] ? formData[key].toString().trim() : ''
  }

  //* Se valida el titulo
  if (!trimmedFormData.title) {
    errors.title = 'El título es requerido.'
  } else if (trimmedFormData.title.length < 3) {
    errors.title = 'El título debe tener al menos 3 caracteres.'
  } else if (trimmedFormData.title.length > 200) {
    errors.title = 'El título no puede tener más de 200 caracteres.'
  }

  //* Se valida la url de la foto
  if (!trimmedFormData.photo) {
    errors.photo = 'La URL de la foto es requerida.'
  } else if (!isPhotoURLValid(trimmedFormData.photo)) {
    errors.photo = 'La URL de la foto no es válida o no es una foto válida.'
  }

  //* Se valida la url del video
  if (!trimmedFormData.link) {
    errors.link = 'La URL del video es requerida.'
  } else if (!isVideoURLValid(trimmedFormData.link)) {
    errors.link = 'La URL del video no es válida o no es un video válido.'
  }

  //* Se valida la descripción
  if (!trimmedFormData.description) {
    errors.description = 'La descripción es requerida.'
  } else if (trimmedFormData.description.length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres.'
  } else if (trimmedFormData.description.length > 500) {
    errors.description = 'La descripción no puede tener más de 500 caracteres.'
  }

  return errors
}

//* Patrón de la url de imagen
const isPhotoURLValid = url => {
  const photoUrlPattern = /\.(jpg|jpeg|png|gif|webp)$/i
  return photoUrlPattern.test(url)
}

//* Patrón de la url de video
const isVideoURLValid = url => {
  const videoUrlPattern =
    /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+\?si=[a-zA-Z0-9_-]+$/
  return videoUrlPattern.test(url)
}
