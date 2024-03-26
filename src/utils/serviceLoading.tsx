import { createRoot } from 'react-dom/client'
import SkLoading from '@components/SkLoading/index'

let requestCount = 0

export const showLoading = () => {
  if (requestCount === 0 && !document.getElementById('JS_RequestLoading')) {
    const loading = document.createElement('div')
    loading.setAttribute('id', 'JS_RequestLoading')
    document.body.appendChild(loading)
    createRoot(loading).render(<SkLoading />)
  }
  requestCount++
}

export const hideLoading = () => {
  requestCount--
  if (requestCount === 0) {
    // document.body.removeChild(document.getElementById('JS_RequestLoading')!)
  }
}