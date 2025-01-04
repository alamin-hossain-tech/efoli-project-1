type Ticket = {
  id: number;
  autoGenId: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
  status: TicketStatus;
  customerId: number;
};

type TicketStatus = "OPEN" | "CLOSED" | "SOLVED";
