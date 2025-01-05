import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  data,
  redirect,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import { getUser } from "~/lib/functions/getUser";
import { prisma } from "~/prisma.server";
import type { Route } from "./+types/create-ticket";

export const ticketSchema = z.object({
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters long")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message must be less than 1000 characters"),
});

const CreateTicketPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const submit = useSubmit();
  const onSubmit = async (data: z.infer<typeof ticketSchema>) => {
    submit(data, { method: "post" });
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData();
  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: actionData.error,
        variant: "destructive",
      });
    } else if (actionData?.success) {
      reset();
      toast({
        title: actionData.message,
        variant: "default",
      });
    }
  }, [actionData, toast]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {isSubmitting ? "Submitting..." : "Create Ticket"}
      </button>
    </form>
  );
};

export default CreateTicketPage;

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Find the default admin
  const defaultAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!defaultAdmin) {
    return data({ error: "No admin available to assign." }, { status: 500 });
  }

  const customer = await getUser(request);

  if (!customer || customer.role !== "CUSTOMER") {
    return data(
      { error: "Only customers can create tickets." },
      { status: 403 }
    );
  }

  try {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const newTicket = await prisma.ticket.create({
      data: {
        autoGenId: `#${randomId}`,
        subject, // Ticket subject
        customerId: customer.id, // ID of the customer (must exist in the User table)
        messages: {
          create: [
            {
              message, // Initial message
              userId: customer.id, // The customer ID sending the initial message
            },
          ],
        },
        assignees: {
          create: [
            {
              adminId: defaultAdmin.id, // Admin ID to assign the ticket to (must exist in the User table with role ADMIN)
            },
          ],
        },
      },
    });
    return data(
      {
        success: true,
        message: "Ticket Create Successfully",
        data: newTicket,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating ticket:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  if (user.role !== "CUSTOMER") {
    return redirect("/");
  }
  return null;
}
