import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import settings from '@/config/index.ts'
const { isMock } = settings
import { mockXHR } from "@/utils/static.ts";

// if(isMock || process.env.NODE_ENV === 'development') {
//   mockXHR()
// }

ReactDOM.createRoot(document.getElementById('shark-admin')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)