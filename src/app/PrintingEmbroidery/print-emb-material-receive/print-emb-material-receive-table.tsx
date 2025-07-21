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
import { EmbMaterialReceiveMasterType } from "@/actions/PrintingEmbroidery/print-emb-material-receive-action";

export function PrintEmbMaterialReceiveTable({
  data,
}: {
  data: EmbMaterialReceiveMasterType[];
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

  const columns: ColumnDef<EmbMaterialReceiveMasterType>[] = [
    {
      accessorKey: "RECEIVE_DATE",
      header: "Receive Date",
      cell: ({ row }) => (
        <div className="capitalize">
          {moment(row.getValue("RECEIVE_DATE")).format("DD-MMM-YYYY")}
        </div>
      ),
    },
    {
      accessorKey: "MATERIAL_RECEIVE_NO",
      header: "Receive No",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("MATERIAL_RECEIVE_NO")}</div>
      ),
    },
    {
      accessorKey: "BUYER",
      header: "Buyer",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="capitalize">
            {!item.BUYER || item.BUYER.trim() === "" ? item.OS_BUYER : item.BUYER}
          </div>
        );
      },
    },
    {
      accessorKey: "STYLE",
      header: "Style",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="capitalize">
            {!item.STYLE || item.STYLE.trim() === "" ? item.OS_STYLE : item.STYLE}
          </div>
        );
      },
    },
    {
      accessorKey: "PO",
      header: "PO",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="capitalize">
            {!item.PO || item.PO.trim() === "" ? item.OS_PO : item.PO}
          </div>
        );
      },
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
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                      `/win/printing-embroidery/print-emb-material-receive/${PageAction.view}/${item.ID}`
                    )
                    : navigate(
                      `/dashboard/printing-embroidery/print-emb-material-receive/${PageAction.view}/${item.ID}`
                    )
                }
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {

                  localStorage.setItem("pageIndex", String(table.getState().pagination?.pageIndex));

                  const targetUrl = location.pathname.includes("win/")
                    ? `/win/printing-embroidery/print-emb-material-receive/${PageAction.edit}/${item.ID}`
                    : `/dashboard/printing-embroidery/print-emb-material-receive/${PageAction.edit}/${item.ID}`;

                  navigate(targetUrl);
                }
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  location.pathname.includes("win/")
                    ? navigate(
                      `/win/printing-embroidery/print-emb-material-receive/${PageAction.delete}/${item.ID}`
                    )
                    : navigate(
                      `/dashboard/printing-embroidery/print-emb-material-receive/${PageAction.delete}/${item.ID}`
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

  //let pageIndex = localStorage.getItem("pageIndex") || 0;

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });


  // React.useEffect(() => {

  //   pageIndex = localStorage.getItem("pageIndex") || 0;

  //   if (pageIndex == pagination.pageIndex) return;

  //   setPagination((prev) => ({
  //     ...prev,
  //     pageIndex: Number(localStorage.getItem("pageIndex")) || 0,
  //   }));

  // });




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
    onPaginationChange: setPagination,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: pagination,
    },

  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-1">
        <Input
          placeholder="Filter operation..."
          value={
            (table
              .getColumn("OPERATION")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("OPERATION")
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
