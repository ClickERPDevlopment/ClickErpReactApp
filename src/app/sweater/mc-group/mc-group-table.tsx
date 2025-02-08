import * as React from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageAction } from "@/utility/page-actions";
import { useLocation, useNavigate } from "react-router";
import { SwtMachineGroupType } from "@/actions/Sweater/swt-mc-group-action";
import AppPageContainer from "@/components/app-page-container";

// import { DataTablePagination } from "@/components/DataTablePagination";

export function McGroupTable({ data }: { data: SwtMachineGroupType[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  console.log(data);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<SwtMachineGroupType>[] = [
    {
      accessorKey: "GROUP_NAME",
      header: "Name",
    },
    {
      accessorKey: "CODE",
      header: "Code",
    },
    {
      accessorKey: "NUMBER_OF_MACHINE",
      header: "MC Qty",
    },
    {
      accessorKey: "FLOOR",
      header: "Floor",
    },
    {
      accessorKey: "SUPERVISOR",
      header: "Supervisor",
    },
    {
      accessorKey: "BEST_FOR_ITEM",
      header: "Best for item",
    },
    {
      accessorKey: "MC_BRAND",
      header: "Brand",
    },
    {
      accessorKey: "MC_GAUGE",
      header: "Gauge",
    },
    {
      accessorKey: "IS_ACTIVE",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("IS_ACTIVE") === true ? "Active" : "Not Active"}
        </div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const country = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(country.ID.toString())
                }
              >
                Copy Country Id
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                        `/win/sweater/mc-group/${PageAction.view}/${country.ID}`
                      )
                    : navigate(
                        `/dashboard/sweater/mc-group/${PageAction.view}/${country.ID}`
                      )
                }
              >
                View M/C Group
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                        `/win/sweater/mc-group/${PageAction.edit}/${country.ID}`
                      )
                    : navigate(
                        `/dashboard/sweater/mc-group/${PageAction.edit}/${country.ID}`
                      )
                }
              >
                Edit M/C Group
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                        `/win/sweater/mc-group/${PageAction.delete}/${country.ID}`
                      )
                    : navigate(
                        `/dashboard/sweater/mc-group/${PageAction.delete}/${country.ID}`
                      )
                }
              >
                Delete M/C Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <AppPageContainer>
      <div className="flex items-center py-4 gap-1">
        <Input
          placeholder="Filter name..."
          value={
            (table.getColumn("GROUP_NAME")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("GROUP_NAME")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-scroll">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-1 text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <DataTablePagination table={table} /> */}
      </div>
    </AppPageContainer>
  );
}
