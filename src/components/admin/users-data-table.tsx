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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  countofpost?: number;
  phone?: string;
  numberOfComplaints?: string;
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
  const isFiltered = searchValue !== "";

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
            onClick={() => onSearchChange("")}
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
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Fetch users with server-side pagination and search
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await AuthService.getUsers(
        pagination.pageIndex + 1, // Backend expects 1-based page numbers
        pagination.pageSize,
        debouncedSearch
      );

      setUsers(res.data.data.users);
      setTotalUsers(res.data.data.total);
      setPageCount(res.data.data.totalPages);
    } catch (error: any) {
      console.log("Error while fetching users:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users when pagination or debounced search changes
  useEffect(() => {
    fetchUsers();
  }, [pagination.pageIndex, pagination.pageSize, debouncedSearch]);

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  // Block/Unblock user
  const blockUser = async () => {
    if (!selectedUser) return;

    try {
      const res = await AuthService.blockUser(selectedUser.id);

      if (res.data.success) {
        alert(selectedUser.isBlocked ? "User Unblocked" : "User Blocked");
        setIsModalOpen(false);
        fetchUsers(); // Refresh current page
      }
    } catch (error: any) {
      alert("Error occurred while blocking user");
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <span
            className={`
              inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
              ${
                user.isBlocked
                  ? "bg-red-100/80 text-red-700 border border-red-200"
                  : "bg-green-100/80 text-green-700 border border-green-200"
              }
            `}
          >
            <span
              className={`
                w-1.5 h-1.5 rounded-full
                ${user.isBlocked ? "bg-red-500" : "bg-green-500"}
              `}
            />
            {user.isBlocked ? "Blocked" : "Active"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedUser(row.original);
            setIsModalOpen(true);
          }}
        >
          View
        </Button>
      ),
    },
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
      <UserDataTableToolbar
        table={table}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        isLoading={isLoading}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                User Details
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-6">
            {selectedUser && (
              <div className="space-y-4 text-sm">
                {/* Basic Info */}
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-gray-700">Name : </span>{" "}
                    {selectedUser.name}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Email : </span>{" "}
                    {selectedUser.email}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Role : </span>{" "}
                    {selectedUser.role}
                  </p>

                  {/* Status with Badge */}
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Status :</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                          ${
                            selectedUser.isBlocked
                              ? "bg-red-100/80 text-red-700 border border-red-200"
                              : "bg-green-100/80 text-green-700 border border-green-200"
                          }
                        `}
                      >
                        <span
                          className={`
                            w-2 h-2 rounded-full
                            ${
                              selectedUser.isBlocked
                                ? "bg-red-500"
                                : "bg-green-500"
                            }
                          `}
                        />
                        {selectedUser.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </div>
                  </div>

                  <p>
                    <span className="font-medium text-gray-700">
                      Phone Number :{" "}
                    </span>
                    {selectedUser.phone ?? "Not available"}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t pt-4" />

                {/* Additional Info */}
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-gray-700">
                      Number of Post Work :{" "}
                    </span>
                    {selectedUser.countofpost ?? "Not available"}
                  </p>

                  <p>
                    <span className="font-medium text-gray-700">
                      Complaint Against this User :{" "}
                    </span>
                    {selectedUser.numberOfComplaints ?? "Not available"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
            <Button
              variant="outline"
              onClick={blockUser}
              className={
                selectedUser?.isBlocked
                  ? "hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                  : "hover:bg-red-50 hover:text-red-700 hover:border-red-300"
              }
            >
              {selectedUser?.isBlocked ? "Unblock User" : "Block User"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="text-center h-24"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {totalUsers > 0 && (
            <>
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                totalUsers
              )}{" "}
              of {totalUsers} users
            </>
          )}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isLoading}
            >
              Previous
            </Button>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {pagination.pageIndex + 1} of {pageCount || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
