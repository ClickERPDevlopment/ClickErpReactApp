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
// import { Checkbox } from "@/components/ui/checkbox";
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
import { SwtGaugeType } from "@/actions/Sweater/swt-gauge-action";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { DataTablePagination } from "@/components/DataTablePagination";
import AppPageContainer from "@/components/app-page-container";

export function GaugeTable({ data }: { data: SwtGaugeType[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<SwtGaugeType>[] = [
    {
      accessorKey: "GAUGE",
      header: "Gauge",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("GAUGE")}</div>
      ),
    },
    {
      accessorKey: "IsActive",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("IsActive") === true ? "Active" : "Not Active"}
        </div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const gauge = row.original;

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
                  navigator.clipboard.writeText(gauge.ID.toString())
                }
              >
                Copy Gauge Id
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                        `/win/sweater/gauge/${PageAction.view}/${gauge.ID}`
                      )
                    : navigate(
                        `/dashboard/sweater/gauge/${PageAction.view}/${gauge.ID}`
                      )
                }
              >
                View Gauge
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                        `/win/sweater/gauge/${PageAction.edit}/${gauge.ID}`
                      )
                    : navigate(
                        `/dashboard/sweater/gauge/${PageAction.edit}/${gauge.ID}`
                      )
                }
              >
                Edit Gauge
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                        `/win/sweater/gauge/${PageAction.delete}/${gauge.ID}`
                      )
                    : navigate(
                        `/dashboard/sweater/gauge/${PageAction.delete}/${gauge.ID}`
                      )
                }
              >
                Delete Gauge
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
          value={(table.getColumn("GAUGE")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("GAUGE")?.setFilterValue(event.target.value)
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
      <div className="box-body">
        <div className="table-responsive">
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
          <DataTablePagination table={table} />
        </div>
      </div>
    </AppPageContainer>
  );
}
