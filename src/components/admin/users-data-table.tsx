import { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthService } from "@/services/auth-service";

// Define User type
interface User {
  name: string;
  email: string;
  role: string;
}

// Toolbar props
interface UserDataTableToolbarProps {
  table: ReturnType<typeof useReactTable<User>>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  isLoading?: boolean;
}

// Toolbar
function UserDataTableToolbar({
  table,
  searchValue,
  onSearchChange,
  isLoading = false,
}: UserDataTableToolbarProps) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || searchValue !== "";

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Search users..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
          disabled={isLoading}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              onSearchChange("");
            }}
            className="h-8 px-2 lg:px-3"
            disabled={isLoading}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}

// Main Component
const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(1);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await AuthService.getUsers()
      let fetchedUsers: User[] = res.data.data.users;

      if (searchValue) {
        fetchedUsers = fetchedUsers.filter(
          (u) =>
            u.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            u.email.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize;
      const paginatedUsers = fetchedUsers.slice(start, end);

      setUsers(paginatedUsers);
      setPageCount(Math.ceil(fetchedUsers.length / pagination.pageSize));
    } catch (error: any) {
      console.log("Error while fetching users:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [searchValue, pagination.pageIndex, pagination.pageSize]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.original.email}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div>{row.original.role}</div>,
    }
  ];

  const table = useReactTable<User>({
    data: users,
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-4">
      {/* <h1 className="text-xl font-bold mb-4">User Management</h1> */}

      <UserDataTableToolbar
        table={table}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        isLoading={isLoading}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
