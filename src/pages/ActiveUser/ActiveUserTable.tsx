/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ConnectedUser } from "./ConnectedUser";

export function ActiveUserTable({ data }: { data: ConnectedUser[] }) {
    // const [sorting, setSorting] = React.useState<SortingState>([]);
    // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    //     []
    // );
    // const [columnVisibility, setColumnVisibility] =
    //     React.useState<VisibilityState>({});
    // const [rowSelection, setRowSelection] = React.useState({});

    const columns: ColumnDef<ConnectedUser>[] = [
        {
            accessorKey: "ConnectionId",
            header: "Connection Id",
            cell: ({ row }: any) => (
                <div className="capitalize">{row.getValue("ConnectionId")}</div>
            ),
        },
        {
            accessorKey: "UserName",
            header: "User Name",
            cell: ({ row }: any) => (
                <div className="capitalize">{row.getValue("UserName")}</div>
            ),
        },
        {
            accessorKey: "FullName",
            header: "Full Name",
            cell: ({ row }: any) => (
                <div className="capitalize">{row.getValue("FullName")}</div>
            ),
        },
        {
            accessorKey: "Designation",
            header: "Designation",
            cell: ({ row }: any) => (
                <div className="capitalize">{row.getValue("Designation")}</div>
            ),
        },
        {
            accessorKey: "App",
            header: "App",
        },
    ];

    const table = useReactTable({
        data,
        columns,
        // onSortingChange: setSorting,
        // onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        // getSortedRowModel: getSortedRowModel(),
        // getFilteredRowModel: getFilteredRowModel(),
        // onColumnVisibilityChange: setColumnVisibility,
        // onRowSelectionChange: setRowSelection,
        // state: {
        //     sorting,
        //     columnFilters,
        //     columnVisibility,
        //     rowSelection,
        // },
    });

    return (
        <div className="w-full min-h-full py-5">
            {/* <div className="flex items-center py-4 gap-1">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("FullName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("FullName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div> */}
            <div className="w-full min-h-full rounded-md border bg-white shadow-sm border-green m-0 p-5">
                <Table className="h-full w-full">
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
            {/* <div className="flex items-center justify-end space-x-2 py-4">
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
            </div> */}
        </div>
    );
}
