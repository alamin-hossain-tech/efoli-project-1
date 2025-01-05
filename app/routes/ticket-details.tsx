import { useState } from "react";
import { data, Form } from "react-router";
import BackButton from "~/components/shared/BackButton";
import { Button } from "~/components/ui/button";
import { getUser } from "~/lib/functions/getUser";
import { prisma } from "~/prisma.server";
import type { Route } from "./+types/ticket-details";
import { Badge } from "~/components/ui/badge";
import moment from "moment";

const TicketDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const ticket = loaderData.ticket;
  const userRole = loaderData.user.role;
  const [reply, setReply] = useState("");
  return (
    <>
      <div className="bg-white rounded-lg border mt-3">
        {/* top part  */}
        <div className="flex items-center justify-between mb-3 p-3 border-b">
          <div className="flex items-center gap-2">
            <BackButton />
            <h4 className="text-xl font-semibold">Ticket {ticket.autoGenId}</h4>
            <Badge variant={ticket.status}>{ticket.status}</Badge>
            <p>{moment(ticket.createdAt).format("DD MMM, YYYY hh:hh A")}</p>
          </div>
          <Form method="post">
            <input type="hidden" name="actionType" value="updateStatus" />
            <div className="flex items-stretch gap-2 ">
              <select
                name="status"
                id="status"
                className="w-full min-w-min border rounded-md p-2 text-sm focus-visible:outline-brand-1"
              >
                <option value="OPEN" selected={ticket.status === "OPEN"}>
                  Open
                </option>
                <option value="SOLVED" selected={ticket.status === "SOLVED"}>
                  Solved
                </option>
                <option value="CLOSED" selected={ticket.status === "CLOSED"}>
                  Closed
                </option>
              </select>
              <Button type="submit">Update Status</Button>
            </div>
          </Form>
        </div>
        {/* bottom part  */}
        <div className="p-3 ">
          {/* Ticket Info */}
          <div className=" pb-4 mb-4">
            <p className="text-gray-600 text-xl">
              <span className="font-semibold">Subject:</span> {ticket.subject}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">Customer:</span>{" "}
              {ticket.customer.name} ({ticket.customer.email})
            </p>
          </div>

          {/* Messages */}
          <h2 className="text-xl font-semibold mb-2">Messages:</h2>
          <div className="bg-gray-5 p-3 rounded">
            <div className="mb-4 ">
              <div className="space-y-4">
                {ticket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.user.role === userRole
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        msg.user.role === userRole
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-1"
                      } max-w-[70%] p-4 rounded-md shadow-md`}
                    >
                      <p className="font-semibold">{msg.user.name}</p>
                      <p>{msg.message}</p>
                      <p className="text-xs text-gray-300 mt-2">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply to Message */}
            <Form method="post" className="space-y-4">
              <input type="hidden" name="actionType" value="reply" />
              <textarea
                name="message"
                id="message"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="w-full border rounded-md p-2"
                rows={4}
                placeholder="Write your reply..."
                required
              />
              <Button type="submit">Reply</Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDetailsPage;

export async function loader({ params, request }: Route.LoaderArgs) {
  const { id } = params;
  const user = await getUser(request);
  // Fetch ticket details with related messages
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(id!) },
    include: {
      customer: { select: { name: true, email: true, role: true } },
      messages: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { name: true, role: true } } },
      },
    },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  return { ticket, user };
}

// Action to handle replies and status updates
export async function action({ request, params }: Route.ActionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const user = await getUser(request);

  if (actionType === "reply") {
    const message = formData.get("message");
    if (typeof message !== "string" || !message.trim()) {
      return data({ error: "Message cannot be empty" }, { status: 400 });
    }

    // Add a reply
    await prisma.message.create({
      data: {
        message,
        ticketId: parseInt(id!),
        userId: user.id, // Replace with the authenticated user's ID
      },
    });
  } else if (actionType === "updateStatus") {
    const status = formData.get("status") as TicketStatus;
    if (!["OPEN", "SOLVED", "CLOSED"].includes(String(status))) {
      return data({ error: "Invalid status" }, { status: 400 });
    }

    // Update the ticket status
    await prisma.ticket.update({
      where: { id: parseInt(id!) },
      data: { status },
    });
  }

  return { success: true };
}
