import moment from "moment";
import { useEffect, useState } from "react";
import { data, Form, useActionData, useSubmit } from "react-router";
import BackButton from "~/components/shared/BackButton";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { getUser } from "~/lib/functions/getUser";
import { prisma } from "~/prisma.server";
import type { Route } from "./+types/ticket-details";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useToast } from "~/hooks/use-toast";
import { getMessageTime } from "~/lib/functions/getMessageTime";
import { getShortName } from "~/lib/functions/getShortName";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Ticket Details" }];
}

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
    return { messageSent: true };
  } else if (actionType === "updateStatus" && user.role !== "CUSTOMER") {
    const status = formData.get("status") as TicketStatus;
    if (!["OPEN", "SOLVED", "CLOSED"].includes(String(status))) {
      return data({ error: "Invalid status" }, { status: 400 });
    }

    await prisma.ticket.update({
      where: { id: parseInt(id!) },
      data: { status },
    });
    return { success: true, message: "Status Update Success" };
  }
  return { success: false, message: "Something went wrong" };
}

const TicketDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const ticket = loaderData.ticket;
  const userRole = loaderData.user.role;
  const [reply, setReply] = useState("");
  const submit = useSubmit();
  const actionData = useActionData();
  const { toast } = useToast();
  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: actionData.error,
        variant: "destructive",
      });
    }
    if (actionData?.success) {
      toast({
        title: actionData.message,
        variant: "default",
      });
    }
    if (actionData?.messageSent) {
      setReply("");
    }
  }, [actionData, toast]);

  return (
    <>
      <div className="bg-white rounded-lg border mt-3">
        {/* top part  */}
        <div className="flex items-start md:items-center flex-col md:flex-row justify-start md:justify-between mb-3 p-3 border-b gap-3 md:gap-0">
          <div className="flex w-full justify-start items-start md:items-center gap-2 flex-col md:flex-row">
            <BackButton />
            <h4 className="text-xl font-semibold">Ticket {ticket.autoGenId}</h4>
            <Badge variant={ticket.status}>{ticket.status}</Badge>
            <p>{moment(ticket.createdAt).format("DD MMM, YYYY hh:hh A")}</p>
          </div>
          <Form method="post" className="flex-shrink-0">
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
                      className={`flex min-w-max max-w-[90%] items-start gap-2 ${
                        msg.user.role === userRole ? "flex-row-reverse" : ""
                      }`}
                    >
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Avatar
                              className={`${
                                msg.user.role === userRole
                                  ? "bg-blue-500 text-white "
                                  : "bg-white text-gray-1"
                              }shadow-md`}
                            >
                              <AvatarFallback
                                className={`${
                                  msg.user.role === userRole
                                    ? "bg-blue-500 text-white "
                                    : "bg-white text-gray-1"
                                }shadow-md`}
                              >
                                {getShortName(msg.user.name)}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-semibold">{msg.user.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div
                        className={`${
                          msg.user.role === userRole
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-1"
                        } max-w-[70%] p-4 rounded-md shadow-md`}
                      >
                        <p>{msg.message}</p>
                        <p className="text-xs text-gray-300 mt-2">
                          {getMessageTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply to Message */}
            {ticket.status === "OPEN" ? (
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      submit(
                        { actionType: "reply", message: reply },
                        { method: "post" }
                      ); // Submit the form
                    }
                  }}
                />
                <Button type="submit">Reply</Button>
              </Form>
            ) : (
              <p className="p-3 bg-green-300 text-center">
                Ticket Marked as {ticket.status}
              </p>
            )}
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
