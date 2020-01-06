import { Dialog, Loading } from 'quasar'

export function showErrorMessague (errorMessage) {
  Loading.hide()
  Dialog.create({
    title: 'Error',
    message: errorMessage
  })
}
