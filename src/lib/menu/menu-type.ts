import { LucideProps } from "lucide-react";

export type MenuType = {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  submenu: MenuType[] | null;
  isOpen: boolean;
};
