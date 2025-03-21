
import  { useEffect } from "react";
import { connect } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import store from "../../../redux/store";
import {ThemeChanger} from "../../../redux/action";
import Themeprimarycolor, * as switcherdata from "./switcherdata/switcherdata";
import { Link } from "react-router-dom";

const Landingswitcher = ({ local_varaiable, ThemeChanger }) => {
  useEffect(() => {
    switcherdata.LocalStorageBackup(ThemeChanger);

  }, []);
  useEffect(() => {
    const theme = store.getState();
    ThemeChanger({
        ...theme,
        "dataNavStyle": "menu-click",
        "dataNavLayout":"horizontal",
        "dataMenuStyles":"dark"
    });
    return () => {
        ThemeChanger({
            ...theme,
            "dataNavStyle": "",
            "dataNavLayout":`${localStorage.ynexlayout == "horizontal" ? "horizontal" : "vertical"}`
        });
    };
  }, []);
  
  const customStyles = `${local_varaiable.colorPrimaryRgb != '' ? `--primary-rgb: ${local_varaiable.colorPrimaryRgb}` : ''};
  ${local_varaiable.colorPrimary != '' ? `--primary: ${local_varaiable.colorPrimary}` : ''};
  ${local_varaiable.darkBg != '' ? `--dark-bg: ${local_varaiable.darkBg}` : ''};
  ${local_varaiable.bodyBg != '' ? `--body-bg: ${local_varaiable.bodyBg}` : ''};
  ${local_varaiable.inputBorder != '' ? `--input-border: ${local_varaiable.inputBorder}` : ''};
  ${local_varaiable.Light != '' ? `--light: ${local_varaiable.Light}` : ''};`

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <html dir={local_varaiable.dir}
            className={local_varaiable.class}
            data-nav-layout={local_varaiable.dataNavLayout}
            data-toggled={local_varaiable.toggled}
            data-nav-style={local_varaiable.dataNavStyle}
            data-menu-position={local_varaiable.dataMenuPosition}
            data-menu-styles={local_varaiable.dataMenuStyles}
            style={customStyles}
          ></html>
        </Helmet>

        <div id="hs-overlay-switcher" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right" tabIndex={-1}>
          <div className="ti-offcanvas-header">
            <h5 className="ti-offcanvas-title">
              Switcher
            </h5>
            <button type="button"
              className="ti-btn flex-shrink-0 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-white/70 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
              data-hs-overlay="#hs-overlay-switcher">
              <span className="sr-only">Close modal</span>
              <i className="ri-close-circle-line leading-none text-lg"></i>
            </button>
          </div>
          <div className="ti-offcanvas-body" id="switcher-body">
                <p className="switcher-style-head">Theme Color Mode:</p>
                <div className="grid grid-cols-3 gap-6 switcher-style">
                  <div className="flex">
                    <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-light-theme"
                      checked={local_varaiable.class == "light"} onChange={_e => { }} onClick={() => switcherdata.Light(ThemeChanger)}  />
                    <label htmlFor="switcher-light-theme"
                      className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Light</label>
                  </div>
                  <div className="flex">
                    <input type="radio" name="theme-style" className="ti-form-radio" id="switcher-dark-theme"  
                    checked={local_varaiable.class == "dark"} onChange={_e => { }} onClick={() => switcherdata.Dark(ThemeChanger)} />
                    <label htmlFor="switcher-dark-theme"
                      className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">Dark</label>
                  </div>
                </div>
                <p className="switcher-style-head">Directions:</p>
                <div className="grid grid-cols-3 gap-6 switcher-style">
                  <div className="flex">
                    <input type="radio" name="direction" className="ti-form-radio" id="switcher-ltr"  checked={local_varaiable.dir == "ltr"} onChange={_e => { }} onClick={() => switcherdata.Ltr(ThemeChanger)} />
                    <label htmlFor="switcher-ltr" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">LTR</label>
                  </div>
                  <div className="flex">
                    <input type="radio" name="direction" className="ti-form-radio" id="switcher-rtl"  checked={local_varaiable.dir == "rtl"} onChange={_e => { }} onClick={() => switcherdata.Rtl(ThemeChanger)} />
                    <label htmlFor="switcher-rtl" className="text-defaultsize text-defaulttextcolor dark:text-defaulttextcolor/70 ms-2  font-semibold">RTL</label>
                  </div>
                </div>
              <div className="theme-colors">
                <p className="switcher-style-head">Theme Primary:</p>
                <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                  <div className="ti-form-radio switch-select">
                    <input className="ti-form-radio color-input color-primary-1" type="radio" name="theme-primary"
                     checked={local_varaiable.colorPrimaryRgb == '58, 88, 146'} onChange={(_e)=>{}}
                      id="switcher-primary"  onClick={() => switcherdata.primaryColor1(ThemeChanger)} />
                  </div>
                  <div className="ti-form-radio switch-select">
                    <input className="ti-form-radio color-input color-primary-2" type="radio" name="theme-primary"
                    checked={local_varaiable.colorPrimaryRgb == '92, 144 ,163'} onChange={(_e)=>{}}
                      id="switcher-primary1" onClick={() => switcherdata.primaryColor2(ThemeChanger)} />
                  </div>
                  <div className="ti-form-radio switch-select">
                    <input className="ti-form-radio color-input color-primary-3" type="radio" name="theme-primary"
                    checked={local_varaiable.colorPrimaryRgb == '161, 90 ,223'} onChange={(_e)=>{}}
                      id="switcher-primary2" onClick={() => switcherdata.primaryColor3(ThemeChanger)} />
                  </div>
                  <div className="ti-form-radio switch-select">
                    <input className="ti-form-radio color-input color-primary-4" type="radio" name="theme-primary"
                    checked={local_varaiable.colorPrimaryRgb == '78, 172, 76'} onChange={(_e)=>{}}
                      id="switcher-primary3" onClick={() => switcherdata.primaryColor4(ThemeChanger)} />
                  </div>
                  <div className="ti-form-radio switch-select">
                    <input className="ti-form-radio color-input color-primary-5" type="radio" name="theme-primary"
                    checked={local_varaiable.colorPrimaryRgb == '223, 90, 90'} onChange={(_e)=>{}}
                      id="switcher-primary4" onClick={() => switcherdata.primaryColor5(ThemeChanger)} />
                  </div>
                  <div className="ti-form-radio switch-select ltr:pl-0 rtl:pr-0 mt-1 color-primary-light">
                    <div className='theme-container-primary'>
                      <button className="">nano</button>
                    </div>
                    <div className='pickr-container-primary'>
                      <div className='pickr'>
                        <button className='pcr-button' onClick={(ele) => {
                          if (ele.target.querySelector("input")) {
                            ele.target.querySelector("input").click();
                          }
                        }}>
                          <Themeprimarycolor theme={local_varaiable} actionfunction={ThemeChanger} />
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="theme-colors">
              <p className="switcher-style-head">Theme Background:</p>
              <div className="flex switcher-style space-x-3 rtl:space-x-reverse">
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-1" type="radio" name="theme-background"
                    checked={local_varaiable.bodyBg == '34 44 110'} onChange={(_e) => { }}
                    id="switcher-background" onClick={() => switcherdata.backgroundColor1(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-2" type="radio" name="theme-background"
                    checked={local_varaiable.bodyBg == '22 92 129'} onChange={(_e) => { }}
                    id="switcher-background1" onClick={() => switcherdata.backgroundColor2(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-3" type="radio" name="theme-background"
                    checked={local_varaiable.bodyBg == '104 51 149'} onChange={(_e) => { }}
                    id="switcher-background2" onClick={() => switcherdata.backgroundColor3(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-4" type="radio" name="theme-background"
                    checked={local_varaiable.bodyBg == '29 106 56'} onChange={(_e) => { }}
                    id="switcher-background3" onClick={() => switcherdata.backgroundColor4(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select">
                  <input className="ti-form-radio color-input color-bg-5" type="radio" name="theme-background"
                    checked={local_varaiable.bodyBg == '134 80 34'} onChange={(_e) => { }}
                    id="switcher-background4" onClick={() => switcherdata.backgroundColor5(ThemeChanger)} />
                </div>
                <div className="ti-form-radio switch-select ps-0 mt-1 color-bg-transparent">
                  <div className='theme-container-background' >
                    <button className="">nano</button>
                  </div>
                  <div className='pickr-container-background'>
                    <div className='pickr'>
                      <button className='pcr-button' onClick={(ele) => {
                        if (ele.target.querySelector("input")) {
                          ele.target.querySelector("input").click();
                        }
                      }}>
                        <switcherdata.Themebackgroundcolor theme={local_varaiable} actionfunction={ThemeChanger} />
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="ti-offcanvas-footer sm:flex justify-between"> 
          <Link to="https://themeforest.net/user/spruko/portfolio" className="w-full ti-btn ti-btn-primary-full m-1" target="_blank" rel="noreferrer">Buy Now</Link>
						<Link to="https://themeforest.net/user/spruko/portfolio" className="w-full ti-btn ti-btn-secondary-full m-1" target="_blank" rel="noreferrer">Our Portfolio</Link>
          <Link to="#" id="reset-all" className="w-full ti-btn ti-btn-danger-full m-1" onClick={() => switcherdata.Reset1(ThemeChanger)}>Reset</Link> 
          </div>
        </div>
      </HelmetProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Landingswitcher);
