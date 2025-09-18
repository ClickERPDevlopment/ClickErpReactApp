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
import Footer from "./components/common/footer/footer";
import Tabtotop from "./components/common/tabtotop/tabtotop";
import "react-toastify/dist/ReactToastify.css";
// import { Outlet } from "react-router-dom";
// import Tabtotop from "../components/common/tabtotop/tabtotop";

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

  useEffect(() => {
    import("preline");
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
