/* eslint-disable */
import { useState } from 'react';

import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Confirmation, DeleteConfirmation } from '@/components/dashboard';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import blogsServices from '@/services/blogsServices';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

// Column definitions
const columns = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className="lowercase">{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'published',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Published
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue('published') ? 'Published' : 'Draft'}
      </div>
    ),
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('updated_at')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const articleId = row.original.id;
      const navigate = useNavigate();

      const handleEditArticle = (id) => {
        navigate(`/dashboard/blogs/edit/${id}`);
      };

      const handlePublishArticle = async (token, id) => {
        try {
          const response = await blogsServices.publishArticleById(token, id, {
            published: !row.getValue('published'),
          });
        } catch (error) {
          console.log('Error publishing article:', error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <DeleteConfirmation
                id={articleId}
                mutateKey="/blogs"
                deleteHandler={blogsServices.deleteArticleById}
                entityName="article"
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <span onClick={() => handleEditArticle(articleId)}>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Confirmation
                id={articleId}
                mutateKey="/blogs"
                actionHandler={handlePublishArticle}
                customLabel={
                  row.getValue('published') ? 'Unpublish' : 'Publish'
                }
                entityName="article"
                customTitle={
                  row.getValue('published')
                    ? 'Are you sure you want to unpublish this article?'
                    : 'Are you sure you want to publish this article?'
                }
                customDescription={
                  row.getValue('published')
                    ? 'This article will be unpublished and will be hidden from the public.'
                    : 'This article will be published and will be visible to the public.'
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Blogs = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const {
    data: articles,
    error,
    isLoading,
  } = useSWR(token ? '/blogs' : null, () =>
    blogsServices.fetchAllArticles(token)
  );
  const handleAddNewArticle = () => {
    navigate('/dashboard/blogs/add');
  };

  const tableData = articles?.data || [];

  const table = useReactTable({
    data: tableData,
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
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          className="max-w-sm"
          placeholder="Filter title..."
          value={table.getColumn('title')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
        />
        <Button onClick={handleAddNewArticle}>Add Article</Button>
      </div>

      {isLoading && (
        <div>
          <Skeleton className="mb-2 h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <p>Error loading users: {error.message}</p>
        </Alert>
      )}

      {!isLoading && !error && (
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
              {isLoading && <p>Loading...</p>}
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
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
                    className="h-24 text-center"
                    colSpan={columns.length}
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
