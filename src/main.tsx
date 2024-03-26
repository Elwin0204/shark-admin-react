import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import settings from '@config/index.ts'
import { lazyMock } from '@utils/index.ts'
const { isMock } = settings

const initMock = async () => {
  if (isMock || process.env.NODE_ENV === 'development') {
    const { mockXHR } = await lazyMock('./static')
    mockXHR()
  }
}

initMock()

ReactDOM.createRoot(document.getElementById('shark-admin')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// )