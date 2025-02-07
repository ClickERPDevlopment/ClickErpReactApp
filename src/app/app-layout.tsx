/* eslint-disable @typescript-eslint/no-unused-vars */
import { Search } from "lucide-react";

import { Link, Outlet } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import LogoutButton from "@/components/logout-button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthContextType, useAuth } from "@/lib/auth-provider";
import { ConfigurationMenu } from "@/lib/menu/configuration-menu";
import { HrPayrollMenu } from "@/lib/menu/hr-payroll-menu";
import { MenuType } from "@/lib/menu/menu-type";
import { ProductionMenu } from "@/lib/menu/production-menu";
import { MerchandisingMenu } from "@/lib/menu/merchandising-menu";
import { TextileMenu } from "@/lib/menu/textile-menu";
import React from "react";

type searchMenuType = {
  label: string;
  value: string;
};

function getMenuList(moduleName: string, menu: MenuType[]) {
  const lstMenu: searchMenuType[] = [];
  menu.forEach((parentEle) => {
    if (!parentEle.submenu) {
      lstMenu.push({
        label: moduleName + " / " + parentEle.title,
        value: parentEle.url,
      });
    } else {
      parentEle.submenu.forEach((firstChild) => {
        if (!firstChild.submenu) {
          lstMenu.push({
            label:
              moduleName + " / " + parentEle.title + " / " + firstChild.title,
            value: firstChild.url,
          });
        } else {
          firstChild.submenu.forEach((secChild) => {
            if (!secChild.submenu) {
              lstMenu.push({
                label:
                  moduleName +
                  " / " +
                  parentEle.title +
                  " / " +
                  firstChild.title +
                  " / " +
                  secChild.title,
                value: secChild.url,
              });
            } else {
              secChild.submenu.forEach((thirdChild) => {
                lstMenu.push({
                  label:
                    moduleName +
                    " / " +
                    parentEle.title +
                    " / " +
                    firstChild.title +
                    " / " +
                    secChild.title +
                    " / " +
                    thirdChild.title,
                  value: thirdChild.url,
                });
              });
            }
          });
        }
      });
    }
  });
  return lstMenu;
}

export function PageSearchDialog() {
  const [filterMenu, setFilterMenu] = React.useState<searchMenuType[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const lstMenu: searchMenuType[] = React.useMemo(() => {
    const lstMenu: searchMenuType[] = [];

    const configMenu = getMenuList("Configuration", ConfigurationMenu);
    const proMenu = getMenuList("Production", ProductionMenu);
    const textMenu = getMenuList("Textile", TextileMenu);
    const hrPayMenu = getMenuList("Hr-Payroll", HrPayrollMenu);
    const merMenu = getMenuList("Merchandising", MerchandisingMenu);

    lstMenu.push(...configMenu);
    lstMenu.push(...proMenu);
    lstMenu.push(...textMenu);
    lstMenu.push(...hrPayMenu);
    lstMenu.push(...merMenu);
    return lstMenu;
  }, []);

  React.useEffect(() => {
    if (inputValue) {
      const filterList = lstMenu.filter((ele) =>
        ele?.label?.toUpperCase().includes(inputValue?.toUpperCase())
      );
      if (filterList) {
        setFilterMenu([...filterList]);
      } else {
        setFilterMenu([]);
      }
    } else {
      setFilterMenu([]);
    }
  }, [inputValue, lstMenu]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Search
          size={18}
          className="mr-5 cursor-pointer hover:text-slate-500"
        />
      </DialogTrigger>
      <DialogContent className="min-w-full min-h-full pt-20 bg-transparent border-none max-h-screen">
        <div className="flex flex-col justify-start items-center w-full">
          <div className="flex justify-center items-center w-full md:w-8/12 lg:w-6/12 ">
            <Input
              id="name"
              placeholder="Search..."
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              className="m-0 w-full col-span-3 border-0 border-b-2 rounded-none border-slate-300 
                         text-slate-100 placeholder:text-slate-300 outline-none
                         bg-transparent
                         "
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col justify-center items-center  w-full md:w-8/12 lg:w-6/12 text-left mt-1">
            {filterMenu?.map((ele) => (
              <Link
                key={Math.random()}
                className="w-full border-0 border-b p-2 text-slate-100"
                to={ele.value}
                onClick={() => setOpen(false)}
              >
                {ele.label}
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AppLayout() {
  const auth: AuthContextType | null = useAuth();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen sm:w-full">
        <nav className="border-b py-2 bg-slate-300">
          <div className=" px-5 flex justify-start items-center">
            <div className="flex justify-center items-center gap-5">
              <SidebarTrigger />
              <Link to={"/dashboard"} className="font-bold text-blue-700">
                Click
              </Link>
            </div>
            <div className="flex flex-1 justify-end items-center">
              <PageSearchDialog />
              <h1 className="hidden sm:block">{auth?.user}</h1>
              <LogoutButton />
            </div>
          </div>
        </nav>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
