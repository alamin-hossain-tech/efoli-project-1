import { useState } from "react";
import { data, Form } from "react-router";
import { Button } from "~/components/ui/button";
import { getUser } from "~/lib/functions/getUser";
import { prisma } from "~/prisma.server";
import type { Route } from "./+types/ticket-details";
import BackButton from "~/components/shared/BackButton";
const TicketDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const ticket = loaderData.ticket;
  const userRole = loaderData.user.role;
  const [reply, setReply] = useState("");
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex">
          <BackButton />
          <h4>{ticket.autoGenId}</h4>
        </div>
        <Form method="post">
          <input type="hidden" name="actionType" value="updateStatus" />
          <div className="flex items-center">
            <select
              name="status"
              id="status"
              className="w-full border rounded-md p-2"
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
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        {/* Ticket Info */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-semibold mb-2">Ticket #{ticket.id}</h1>
          <p className="text-gray-600">
            <span className="font-semibold">Subject:</span> {ticket.subject}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`${
                ticket.status === "OPEN"
                  ? "text-blue-600"
                  : ticket.status === "SOLVED"
                  ? "text-green-600"
                  : "text-red-600"
              } font-semibold`}
            >
              {ticket.status}
            </span>
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Customer:</span>{" "}
            {ticket.customer.name} ({ticket.customer.email})
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(ticket.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Messages */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <div className="space-y-4">
            {ticket.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.user.role === userRole ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.user.role === userRole
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-black"
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
          <div>
            <label htmlFor="message" className="block font-semibold mb-2">
              Add a Reply
            </label>
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
          </div>
          <Button type="submit">Reply</Button>
        </Form>
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
