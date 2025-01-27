import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import settings from '@/config/index.ts'
const { isMock } = settings
import { mockXHR } from "@/utils/static.ts";
import { setupI18n } from './i18n/index.ts'

if(isMock || process.env.NODE_ENV === 'development') {
  mockXHR()
}

function setupApp() {
  setupI18n();

  const container = document.getElementById('shark-admin');
  if (!container) return;
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}

setupApp();

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// )