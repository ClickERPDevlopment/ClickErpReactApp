import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ScrollToTop from "./components/ui/scrolltotop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.Fragment>
      <BrowserRouter>
        <React.Suspense>
          <ScrollToTop />
          <Routes>
            <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
              {/* <Route index element={<Crm />} />
              <Route
                path={`${import.meta.env.BASE_URL}dashboards/crm`}
                element={<Crm />}
              /> */}
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </React.Fragment>
  </StrictMode>
);
