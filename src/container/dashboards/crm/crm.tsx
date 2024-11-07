import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Conversionratio, Dealsstatistics, Profit, Profitearned, Revenueanalytics, Sourcedata, Totalcustomers, Totaldeals, Totalrevenue } from './crmdata';
import face10 from "../../../assets/images/faces/10.jpg";
import face12 from "../../../assets/images/faces/12.jpg";


const Crm = () => {
  // for User search function
  const [Data, setData] = useState(Dealsstatistics);

  const userdata: any = [];

  const myfunction = (idx: any) => {
    let Data;
    for (Data of Dealsstatistics) {
      if (Data.name[0] == " ") {
        Data.name = Data.name.trim();
      }
      if (Data.name.toLowerCase().includes(idx.toLowerCase())) {
        if (Data.name.toLowerCase().startsWith(idx.toLowerCase())) {
          userdata.push(Data);
        }
      }

    }
    setData(userdata);
  };
  return (
    <Fragment>
      <div className="md:flex block items-center justify-between my-[1.5rem] page-header-breadcrumb">
        <div>
          <p className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0 ">Welcome back, Json Taylor !</p>
          <p className="font-normal text-[#8c9097] dark:text-white/50 text-[0.813rem]">Track your sales activity, leads and deals here.</p>
        </div>
        <div className="btn-list md:mt-0 mt-2">
          <button type="button"
            className="ti-btn bg-primary text-white btn-wave !font-medium !me-[0.375rem] !ms-0 !text-[0.85rem] !rounded-[0.35rem] !py-[0.51rem] !px-[0.86rem] shadow-none mb-0">
            <i className="ri-filter-3-fill  inline-block"></i>Filters
          </button>
          <button type="button"
            className="ti-btn ti-btn-outline-secondary btn-wave !font-medium  !me-[0.375rem]  !ms-0 !text-[0.85rem] !rounded-[0.35rem] !py-[0.51rem] !px-[0.86rem] shadow-none mb-0">
            <i className="ri-upload-cloud-line  inline-block"></i>Export
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xxl:col-span-9 xl:col-span-12  col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-4 xl:col-span-4  col-span-12">
              <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                <div className="box crm-highlight-card">
                  <div className="box-body">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[1.125rem] text-white mb-2">Your target is incomplete</div>
                        <span className="block text-[0.75rem] text-white"><span className="opacity-[0.7]">You have
                          completed</span> <span className="font-semibold text-warning">48%</span> <span className="opacity-[0.7]">of the given
                            target, you can also check your status</span>.</span>
                        <span className="block font-semibold mt-[0.125rem]"><Link className="text-white text-[0.813rem]"
                          to="#"><u>Click
                            here</u></Link></span>
                      </div>
                      <div>
                        <div id="crm-main">
                          <Profit />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                <div className="box">
                  <div className="box-header flex justify-between">
                    <div className="box-title">
                      Top Deals
                    </div>
                    <div className="hs-dropdown ti-dropdown">
                      <Link aria-label="anchor" to="#"
                        className="flex items-center justify-center w-[1.75rem] h-[1.75rem]  !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                        aria-expanded="false">
                        <i className="fe fe-more-vertical text-[0.8rem]"></i>
                      </Link>
                      <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#">Week</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#">Month</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#">Year</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="box-body">
                    <ul className="list-none crm-top-deals mb-0">
                      <li className="mb-[0.9rem]">
                        <div className="flex items-start flex-wrap">
                          <div className="me-2">
                            <span className=" inline-flex items-center justify-center">
                              <img src={face10} alt=""
                                className="w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full" />
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Michael Jordan
                            </p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">michael.jordan@example.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$2,893</div>
                        </div>
                      </li>
                      <li className="mb-[0.9rem]">
                        <div className="flex items-start flex-wrap">
                          <div className="me-2">
                            <span
                              className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-warning  bg-warning/10 font-semibold">
                              EK
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Emigo Kiaren</p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">emigo.kiaren@gmail.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$4,289</div>
                        </div>
                      </li>
                      <li className="mb-[0.9rem]">
                        <div className="flex items-top flex-wrap">
                          <div className="me-2">
                            <span className="inline-flex items-center justify-center">
                              <img src={face12} alt=""
                                className="!w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full" />
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Randy Origoan
                            </p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">randy.origoan@gmail.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$6,347</div>
                        </div>
                      </li>
                      <li className="mb-[0.9rem]">
                        <div className="flex items-top flex-wrap">
                          <div className="me-2">
                            <span
                              className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-success bg-success/10 font-semibold">
                              GP
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">George Pieterson
                            </p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">george.pieterson@gmail.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$3,894</div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-top flex-wrap">
                          <div className="me-2">
                            <span
                              className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-primary bg-primary/10 font-semibold">
                              KA
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold mb-[1.4px]  text-[0.813rem]">Kiara Advain</p>
                            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">kiaraadvain214@gmail.com</p>
                          </div>
                          <div className="font-semibold text-[0.9375rem] ">$2,679</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                <div className="box">
                  <div className="box-header justify-between">
                    <div className="box-title">Profit Earned</div>
                    <div className="hs-dropdown ti-dropdown">
                      <Link to="#" className="px-2 font-normal text-[0.75rem] text-[#8c9097] dark:text-white/50"
                        aria-expanded="false">
                        View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                      </Link>
                      <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#">Today</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#">This Week</Link></li>
                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                          to="#">Last Week</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="box-body !py-0 !ps-0">
                    <div id="crm-profits-earned">
                      <Profitearned />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-8  xl:col-span-8  col-span-12">
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-primary">
                            <i className="ti ti-users text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Total Customers</p>
                              <h4 className="font-semibold  text-[1.5rem] !mb-2 ">1,02,890</h4>
                            </div>
                            <div id="crm-total-customers">
                              <Totalcustomers />
                            </div>
                          </div>
                          <div className="flex items-center justify-between !mt-1">
                            <div>
                              <Link className="text-primary text-[0.813rem]" to="#">View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>
                            <div className="text-end">
                              <p className="mb-0 text-success text-[0.813rem] font-semibold">+40%</p>
                              <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">this month</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-secondary">
                            <i className="ti ti-wallet text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Total Revenue</p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">$56,562</h4>
                            </div>
                            <div id="crm-total-revenue">
                              <Totalrevenue />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link className="text-secondary text-[0.813rem]" to="#">View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>
                            <div className="text-end">
                              <p className="mb-0 text-success text-[0.813rem] font-semibold">+25%</p>
                              <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">this month</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-success">
                            <i className="ti ti-wave-square text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Conversion Ratio</p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">12.08%</h4>
                            </div>
                            <div id="crm-conversion-ratio">
                              <Conversionratio />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link className="text-success text-[0.813rem]" to="#">View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>
                            <div className="text-end">
                              <p className="mb-0 text-danger text-[0.813rem] font-semibold">-12%</p>
                              <p className="text-[#8c9097] dark:text-white/50 opacity-[0.7] text-[0.6875rem]">this month</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-body">
                      <div className="flex items-top justify-between">
                        <div>
                          <span
                            className="!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-warning">
                            <i className="ti ti-briefcase text-[1rem] text-white"></i>
                          </span>
                        </div>
                        <div className="flex-grow ms-4">
                          <div className="flex items-center justify-between flex-wrap">
                            <div>
                              <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">Total Deals</p>
                              <h4 className="font-semibold text-[1.5rem] !mb-2 ">2,543</h4>
                            </div>
                            <div id="crm-total-deals">
                              <Totaldeals />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div>
                              <Link className="text-warning text-[0.813rem]" to="#">View All<i
                                className="ti ti-arrow-narrow-right ms-2 font-semibold inline-block"></i></Link>
                            </div>
                            <div className="text-end">
                              <p className="mb-0 text-success text-[0.813rem] font-semibold">+19%</p>
                              <p className="text-[#8c9097] dark:text-white/50  opacity-[0.7] text-[0.6875rem]">this month</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-header !gap-0 !m-0 justify-between">
                      <div className="box-title">
                        Revenue Analytics
                      </div>
                      <div className="hs-dropdown ti-dropdown">
                        <Link to="#" className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50"
                          aria-expanded="false">
                          View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                        </Link>
                        <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                          <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                            to="#">Today</Link></li>
                          <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                            to="#">This Week</Link></li>
                          <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                            to="#">Last Week</Link></li>
                        </ul>
                      </div>
                    </div>
                    <div className="box-body !py-5">
                      <div id="crm-revenue-analytics">
                        <Revenueanalytics />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-12 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-12 xl:col-span-12  col-span-12">
              <div className="box">
                <div className="box-header justify-between">
                  <div className="box-title">
                    Leads By Source
                  </div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link aria-label="anchor" to="#"
                      className="flex items-center justify-center w-[1.75rem] h-[1.75rem] ! !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
                      aria-expanded="false">
                      <i className="fe fe-more-vertical text-[0.8rem]"></i>
                    </Link>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
                      <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        to="#">Week</Link></li>
                      <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        to="#">Month</Link></li>
                      <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        to="#">Year</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="box-body overflow-hidden">
                  <div className="leads-source-chart flex items-center justify-center">
                    <Sourcedata />
                    <div className="lead-source-value ">
                      <span className="block text-[0.875rem] ">Total</span>
                      <span className="block text-[1.5625rem] font-bold">4,145</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-t border-dashed dark:border-defaultborder/10">
                  <div className="col !p-0">
                    <div className="!ps-4 p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend mobile inline-block">Mobile
                      </span>
                      <div><span className="text-[1rem]  font-semibold">1,624</span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend desktop inline-block">Desktop
                      </span>
                      <div><span className="text-[1rem]  font-semibold">1,267</span></div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="p-[0.95rem] text-center border-e border-dashed dark:border-defaultborder/10">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend laptop inline-block">Laptop
                      </span>
                      <div><span className="text-[1rem]  font-semibold">1,153</span>
                      </div>
                    </div>
                  </div>
                  <div className="col !p-0">
                    <div className="!pe-4 p-[0.95rem] text-center">
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.75rem] mb-1 crm-lead-legend tablet inline-block">Tablet
                      </span>
                      <div><span className="text-[1rem]  font-semibold">679</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-12 xl:col-span-6  col-span-12">
              <div className="box">
                <div className="box-header justify-between">
                  <div className="box-title">
                    Deals Status
                  </div>
                  <div className="hs-dropdown ti-dropdown">
                    <Link to="#" className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50"
                      aria-expanded="false">
                      View All<i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                    </Link>
                    <ul className="hs-dropdown-menu ti-dropdown-menu hidden" role="menu">
                      <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        to="#">Today</Link></li>
                      <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        to="#">This Week</Link></li>
                      <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                        to="#">Last Week</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="box-body">
                  <div className="flex items-center mb-[0.8rem]">
                    <h4 className="font-bold mb-0 text-[1.5rem] ">4,289</h4>
                    <div className="ms-2">
                      <span
                        className="py-[0.18rem] px-[0.45rem] rounded-sm text-success !font-medium !text-[0.75em] bg-success/10">1.02<i
                          className="ri-arrow-up-s-fill align-mmiddle ms-1"></i></span>
                      <span className="text-[#8c9097] dark:text-white/50 text-[0.813rem] ms-1">compared to last week</span>
                    </div>
                  </div>

                  <div className="flex w-full h-[0.3125rem] mb-6 rounded-full overflow-hidden">
                    <div className="flex flex-col justify-center rounded-s-[0.625rem] overflow-hidden bg-primary w-[21%]" style={{ width: "21%" }} aria-valuenow={21} aria-valuemin={0} aria-valuemax={100}>
                    </div>
                    <div className="flex flex-col justify-center rounded-none overflow-hidden bg-info w-[26%]" style={{ width: "26%" }} aria-valuenow={26} aria-valuemin={0} aria-valuemax={100}>
                    </div>
                    <div className="flex flex-col justify-center rounded-none overflow-hidden bg-warning w-[35%]" style={{ width: "35%" }} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100}>
                    </div>
                    <div className="flex flex-col justify-center rounded-e-[0.625rem] overflow-hidden bg-success w-[18%]" style={{ width: "18%" }} aria-valuenow={18} aria-valuemin={0} aria-valuemax={100}>
                    </div>
                  </div>
                  <ul className="list-none mb-0 pt-2 crm-deals-status">
                    <li className="primary">
                      <div className="flex items-center text-[0.813rem]  justify-between">
                        <div>Successful Deals</div>
                        <div className="text-[0.75rem] text-[#8c9097] dark:text-white/50">987 deals</div>
                      </div>
                    </li>
                    <li className="info">
                      <div className="flex items-center text-[0.813rem]  justify-between">
                        <div>Pending Deals</div>
                        <div className="text-[0.75rem] text-[#8c9097] dark:text-white/50">1,073 deals</div>
                      </div>
                    </li>
                    <li className="warning">
                      <div className="flex items-center text-[0.813rem]  justify-between">
                        <div>Rejected Deals</div>
                        <div className="text-[0.75rem] text-[#8c9097] dark:text-white/50">1,674 deals</div>
                      </div>
                    </li>
                    <li className="success">
                      <div className="flex items-center text-[0.813rem]  justify-between">
                        <div>Upcoming Deals</div>
                        <div className="text-[0.75rem] text-[#8c9097] dark:text-white/50">921 deals</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="transition fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 opacity-0 hidden"></div>
    </Fragment>
  );
}

export default Crm;
