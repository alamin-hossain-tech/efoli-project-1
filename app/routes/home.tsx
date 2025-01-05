import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
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
import type { Route } from "./+types/home";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "~/components/ui/badge";
// Ensure you have Prisma set up

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tickets" },
    { name: "description", content: "Welcome to my app" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const tickets = loaderData?.tickets;
  const role = loaderData?.role;
  const navigate = useNavigate();
  const handleRoute = (id: number) => {
    navigate(`/view-ticket/${id}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2">
        <p className="text-lg">All Tickets</p>
      </div>
      <div className="border flex-grow bg-white rounded-md">
        {/* Top Part */}
        <div className="flex items-center justify-between p-3 border-b">
          <div>
            <div className="relative">
              <Input />
              <Search className="text-gray-3 scale-75 absolute left-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          {role === "CUSTOMER" && (
            <div>
              <Button asChild>
                <Link to={"/create-ticket"}>Create a ticket</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Tickets Table */}
        <div className="p-3">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-4">
                  <TableHead className="w-[100px]">Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      onClick={() => handleRoute(ticket.id)}
                      className="cursor-pointer hover:bg-gray-5"
                    >
                      <TableCell className="font-medium">
                        {ticket.autoGenId}
                      </TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge variant={ticket.status}>{ticket.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(ticket.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No tickets found
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
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);

  // Fetch tickets based on user role
  let tickets: Ticket[] = [];
  if (user.role === "ADMIN") {
    // Admin can see all tickets
    tickets = await prisma.ticket.findMany();
  } else if (user.role === "CUSTOMER") {
    // Customer can see only their tickets
    tickets = await prisma.ticket.findMany({
      where: { customerId: user.id },
    });
  }

  return { tickets, role: user.role };
}
