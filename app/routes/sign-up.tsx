import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  redirect,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";
import { prisma } from "~/prisma.server";

// Validation schema using Zod
const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// SignUp Component
const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // Process form submission here
    submit(data, { method: "POST" });
  };
  const { toast } = useToast();
  const actionData = useActionData();
  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData, toast]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-screen justify-center items-center px-4">
        <div className="flex flex-col border border-gray-200 p-4 lg:p-5 rounded-lg bg-white min-w-full lg:min-w-[450px] gap-3">
          <div>
            <h4 className="text-2xl font-semibold">Sign Up</h4>
            <p className="text-gray-2 text-sm">Please create an account</p>
          </div>
          <div className="space-y-1">
            <label htmlFor="name" className="text-gray-1 text-sm">
              Name
            </label>
            <div className="relative">
              <Input
                {...register("name")}
                id="name"
                placeholder="John Doe"
                isError={!!errors.name}
                className="bg-gray-5 placeholder:text-gray-3 ps-9"
              />
              <User className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-3 scale-75" />
            </div>
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="text-gray-1 text-sm">
              Email address
            </label>
            <div className="relative">
              <Input
                {...register("email")}
                id="email"
                placeholder="john@example.com"
                type="email"
                isError={!!errors.email}
                className="bg-gray-5 placeholder:text-gray-3 ps-9"
              />
              <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-3 scale-75" />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-gray-1 text-sm">
              Password
            </label>
            <div className="relative">
              <Input
                {...register("password")}
                id={"password"}
                type={"password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                isError={!!errors.password}
                className="bg-gray-5 placeholder:text-gray-3 ps-9"
              />
              <LockKeyhole className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-3 scale-75" />
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="confirm" className="text-gray-1 text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                id={"confirm"}
                type={"password"}
                autoComplete="current-password"
                placeholder="Confirm password"
                isError={!!errors.confirmPassword}
                className="bg-gray-5 placeholder:text-gray-3 ps-9"
              />
              <LockKeyhole className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-3 scale-75" />
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            variant={"brand3"}
            className="mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-gray-2 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-brand-3">
               Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUpPage;

// Action for server-side processing
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Email is already in use." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return redirect("/login");
};
