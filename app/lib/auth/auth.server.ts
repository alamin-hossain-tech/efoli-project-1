import bcrypt from "bcryptjs";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { prisma } from "~/prisma.server";

export const authenticator = new Authenticator<AuthUser>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string | null;
    const password = form.get("password") as string | null;

    if (!email || !password) {
      throw new Error("Missing email or password");
    }

    // Check if user exists in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Wrong Password");
    }
    const role: Role = user.role as Role;

    // Create a user object to return
    const authUser: AuthUser = {
      name: user.name,
      email: user.email,
      role,
      id: user.id,
    };

    return authUser;
  }),
  "user-pass"
);
