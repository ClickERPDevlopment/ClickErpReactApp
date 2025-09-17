/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { MenuType } from "@/lib/menu/menu-type";
import { ConfigurationMenu } from "@/lib/menu/configuration-menu";
import { SweaterMenu } from "@/lib/menu/sweater-menu";
import { ProductionMenu } from "@/lib/menu/production-menu";
import { MerchandisingMenu } from "@/lib/menu/merchandising-menu";
import { HrPayrollMenu } from "@/lib/menu/hr-payroll-menu";
import { TextileMenu } from "@/lib/menu/textile-menu";

export function GetMenuComponent({ item }: { item: MenuType }) {
  if (!item.submenu) {
    return (
      <SidebarMenuItem
        key={item.title}
        className={cn(
          window.location.pathname === item.url ? "bg-slate-500 rounded-md" : ""
        )}
      >
        <SidebarMenuButton asChild>
          <Link to={item.url}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  } else {
    return <GetSubmenuComponent item={item} />;
  }
}

const GetSubmenuComponent = ({ item }: { item: MenuType }) => {
  const [open, onOpenChange] = React.useState<boolean>(false);

  if (item) {
    return (
      <Collapsible
        defaultOpen
        className="group/collapsible"
        open={open}
        onOpenChange={onOpenChange}
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <ArrowUpDown className="text-sky-500" /> {item.title}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.submenu?.map((item) => (
                <SidebarMenuSubItem
                  key={item.title}
                  className={cn(
                    window.location.pathname.includes(item.url)
                      ? "bg-slate-500 rounded-md"
                      : ""
                  )}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }
  return <></>;
};

export function AppSidebar() {
  const pathname = window.location.pathname;

  const { menu, moduleTitle } = React.useMemo(() => {
    if (pathname.includes("/dashboard/configuration")) {
      return { menu: ConfigurationMenu, moduleTitle: "Configuration" };
    } else if (pathname.includes("/dashboard/production")) {
      return { menu: ProductionMenu, moduleTitle: "Production" };
    } else if (pathname.includes("/dashboard/textile")) {
      return { menu: TextileMenu, moduleTitle: "Textile" };
    } else if (pathname.includes("/dashboard/hr-payroll")) {
      return { menu: HrPayrollMenu, moduleTitle: "Hr-Payroll" };
    } else if (pathname.includes("/dashboard/sweater")) {
      return { menu: SweaterMenu, moduleTitle: "Sweater" };
    } else if (pathname.includes("/dashboard/merchandising")) {
      return { menu: MerchandisingMenu, moduleTitle: "Merchandising" };
    } else {
      return { menu: [], moduleTitle: "Application" };
    }
  }, [pathname]);
  return null;
  return (
    <Sidebar>
      <SidebarContent className="shadow-lg bg-slate-600">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-600 w-full border-b-2 mb-2 rounded-none">
            <em className="w-full text-base text-center underline text-blue-400 font-bold">
              {moduleTitle}
            </em>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item: any) => (
                <GetMenuComponent key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
