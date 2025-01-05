import _ from "lodash";
import { Search } from "lucide-react";
import moment from "moment";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getUser } from "~/lib/functions/getUser";
import { prisma } from "~/prisma.server";
import type { Route } from "./+types/users";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Users" }];
}

const UsersPage = ({ loaderData }: Route.ComponentProps) => {
  const users = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const debouncedSearch = useMemo(
    () =>
      _.debounce((query: string) => {
        setSearchParams({ search: query }); // Update URL with the search query
      }, 300),
    [setSearchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query); // Update local state
    debouncedSearch(query); // Call debounced function
  };
  return (
    <div className="flex flex-col h-full">
      <div className="mb-2">
        <p className="text-lg">All Users</p>
      </div>
      <div className="border flex-grow bg-white rounded-md">
        {/* Top Part */}
        <div className="flex items-center justify-between p-3 border-b">
          <div>
            <div className="relative">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-8"
              />
              <Search className="text-gray-3 scale-75 absolute left-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="p-3">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-4">
                  <TableHead className="w-[100px]"> ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="cursor-pointer hover:bg-gray-5"
                    >
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-right">
                        {moment(user.createdAt).format("DD MMM, YYYY hh:mm A")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No Users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") || "";

  // Fetch tickets based on user role

  if (user.role === "ADMIN") {
    // Admin can see all tickets
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery } },
          { email: { contains: searchQuery } },
        ],
      },
    });
    return users;
  }

  return [];
}
