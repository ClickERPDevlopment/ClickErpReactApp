"use client";

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
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import moment from "moment";
import { usePrintEmbProductionStore } from "@/store/app-store";
import { PrintEmbQualityMaster } from "@/actions/PrintingEmbroidery/print-emb-quality-action";

export function PrintEmbQualityTable({
  data,
}: {
  data: PrintEmbQualityMaster[];
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { pageIndex, pageSize, setPageIndex } = usePrintEmbProductionStore();
  const params = new URLSearchParams(location.search);
  const index = params.get("pageIndex");

  React.useEffect(() => {

    if (index && Number(index) > 0) {
      table.setPageIndex(Number(index));
    }

  }, []);

  React.useEffect(() => {

    setTimeout(() => {
      if (index && Number(index) > 0) {
        table.setPageIndex(Number(index));
      }
    }, 2000);

  }, [data]);



  const columns: ColumnDef<PrintEmbQualityMaster>[] = [
    {
      accessorKey: "EntryDate",
      header: "Date",
      cell: ({ row }) => (
        <div className="capitalize">{moment(row.getValue("EntryDate")).format("DD-MMM-YYYY")}</div>
      ),
    },
    {
      accessorKey: "Party",
      header: "Party",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Party")}</div>
      ),
    },
    {
      accessorKey: "EmbType",
      header: "Emb Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("EmbType")}</div>
      ),
    },
    {
      accessorKey: "Floor",
      header: "Floor",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Floor")}</div>
      ),
    },
    {
      accessorKey: "WorkOrder",
      header: "WorkOrder",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("WorkOrder")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;

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
                  navigator.clipboard.writeText(item.ID.toString())
                }
              >
                Copy Planning Board Confugure Id
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                      `/win/printing-embroidery/print-emb-quality/${PageAction.view}/${item.Id}?pageIndex=${pageIndex}`
                    )
                    : navigate(
                      `/dashboard/printing-embroidery/print-emb-quality/${PageAction.view}/${item.Id}?pageIndex=${pageIndex}`
                    )
                }
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const basePath = location.pathname.includes("win/")
                    ? "/win/printing-embroidery/print-emb-quality"
                    : "/dashboard/printing-embroidery/print-emb-quality";

                  navigate(`${basePath}/${PageAction.edit}/${item.Id}?pageIndex=${pageIndex}`);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                      `/win/printing-embroidery/print-emb-quality/${PageAction.delete}/${item.Id}`
                    )
                    : navigate(
                      `/dashboard/printing-embroidery/print-emb-quality/${PageAction.delete}/${item.Id}`
                    )
                }
              >
                Delete
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
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
      } else {
        setPageIndex(updater.pageIndex);
      }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-1">
        <Input
          placeholder="Filter operation..."
          value={
            (table
              .getColumn("WorkOrder")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("WorkOrder")
              ?.setFilterValue(event.target.value)
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
                    <TableHead key={header.id}>
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
                    <TableCell key={cell.id} className="p-1">
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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              const currentUrl = new URL(window.location.href);
              currentUrl.searchParams.set("pageIndex", pageIndex.toString());
              window.history.replaceState({}, '', currentUrl.toString());
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              const currentUrl = new URL(window.location.href);
              currentUrl.searchParams.set("pageIndex", pageIndex.toString());
              window.history.replaceState({}, '', currentUrl.toString());
            }

            }
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
