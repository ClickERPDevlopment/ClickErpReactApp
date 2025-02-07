import React from "react";
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "src/lib/utils";
import { Button } from "src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { Link } from "react-router";

type CardProps = React.ComponentProps<typeof Card>;

export function ReportCard({
  menu,
  title,
}: {
  menu: {
    menu: string;
    path: string;
    isCurrent: boolean;
  }[];
  title: string;
}) {
  return (
    <div style={{ alignSelf: "stretch" }}>
      <Card className={cn("w-[380px]") + " h-[100%]"}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {menu.length} reports are available.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="max-w-[330px]">
            {menu.map((notification, index) => (
              <Link
                key={index}
                to={notification.path}
                className="mb-2 grid grid-cols-[25px_1fr] items-start p-4 rounded-lg border hover:border-slate-400 hover:cursor-pointer"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.menu}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
