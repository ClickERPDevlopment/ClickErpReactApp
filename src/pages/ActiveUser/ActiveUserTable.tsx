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
import { Input } from "@/components/ui/input";

export function ActiveUserTable({ data }: { data: ConnectedUser[] }) {

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
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full min-h-full p-5 bg-white rounded-md shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-1">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("FullName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("FullName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="flex-1 rounded-md border bg-white shadow-sm border-green m-0 p-0">
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
        </div>
    );
}
