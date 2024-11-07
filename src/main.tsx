import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Crm from './container/dashboards/crm/crm.js'
import './index.scss'
import ScrollToTop from './components/ui/scrolltotop.js'
// import DashBoard from './container/dashboards/index.js'
//import DashBoard from './container/dashboards/index.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense>
        <ScrollToTop />
        <Routes>
          <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
            <Route index element={<Crm />} />
            {/* <Route index element={<DashBoard />} /> */}
            {/* <Route path={`${import.meta.env.BASE_URL}dashboards/crm`} element={<Crm />} /> */}
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
)
