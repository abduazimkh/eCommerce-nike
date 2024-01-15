import ReactDOM from 'react-dom/client'
import { Suspense, lazy } from 'react'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
const App = lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </BrowserRouter>
)