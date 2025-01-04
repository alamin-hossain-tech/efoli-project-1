interface AuthUser {
  name: string;
  email: string;
  role: Role; // Use Prisma's Role enum
  id: number;
}

enum Role {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}
