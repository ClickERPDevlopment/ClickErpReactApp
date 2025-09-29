/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect } from "react";
import Loader from "./components/common/loader/loader";
import store from "./redux/store";
// import Loader from "../components/common/loader/loader";
// import Footer from "../components/common/footer/footer";
// import Sidebar from "../components/common/sidebar/sidebar";
// import Switcher from "../components/common/switcher/switcher";
// import Header from "../components/common/header/header";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import Switcher from "./components/common/switcher/switcher";
import Header from "./components/common/header/header";
import Sidebar from "./components/common/sidebar/sidebar";
import { Outlet } from "react-router";
// import Footer from "./components/common/footer/footer";
import Tabtotop from "./components/common/tabtotop/tabtotop";
import "react-toastify/dist/ReactToastify.css";
// import { Outlet } from "react-router-dom";
// import Tabtotop from "../components/common/tabtotop/tabtotop";
import OneSignal from 'react-onesignal';
import useAppClient from "./hooks/use-AppClient";

function App() {
  // const [MyclassName, setMyClass] = useState("");

  // const Bodyclickk = () => {
  //   if (localStorage.getItem("ynexverticalstyles") == "icontext") {
  //     setMyClass("");
  //   }
  //   if (window.innerWidth > 992) {
  //     const html: any = document.documentElement;
  //     if (html.getAttribute("icon-overlay") === "open") {
  //       html.setAttribute("icon-overlay", "");
  //     }
  //   }
  // };
  const client = useAppClient();

  useEffect(() => {
    import("preline");
  }, []);

  useEffect(() => {
    if (client.currentClient === client.AG) {
      if (typeof window !== 'undefined') {
        OneSignal.init({
          appId: "636e1ca4-99a7-47a6-bbb7-0eb60c85b697",
        });
      }
    }
  }, []);

  return (
    <Fragment>
      <Loader />
      <Provider store={store}>
        <HelmetProvider>
          <Helmet
            htmlAttributes={{
              lang: "en",
              dir: "ltr",
              "data-menu-styles": "dark",
              class: "light",
              "data-nav-layout": "vertical",
              "data-header-styles": "light",
              "data-vertical-style": "overlay",
              loader: "disable",
              // "data-icon-text": MyclassName,
            }}
          />
          <Switcher />
          <div className="page">
            <Header />
            <Sidebar />
            <div className="content main-index flex flex-1">
              <div
                className="main-content min-w-full min-h-full"
              // onClick={Bodyclickk}
              >
                <Outlet />
              </div>
            </div>
            {/* <Footer /> */}
          </div>
          <Tabtotop />
        </HelmetProvider>
      </Provider>
    </Fragment>
  );
}

export default App;
