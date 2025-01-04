import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";
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
import { authenticator } from "~/lib/auth/auth.server";
import { sessionStorage } from "~/lib/auth/session.server";
import type { Route } from "./+types/login";
import { useToast } from "~/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData, toast]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const submit = useSubmit();

  const onSubmit = async (data: LoginSchema) => {
    // Submit form data
    submit(data, { method: "post" });
    // Optionally: You can handle form submission here or let Remix handle it.
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-screen justify-center items-center px-4">
          <div className="flex flex-col border border-gray-200 p-4 lg:p-5 rounded-lg bg-white min-w-full lg:min-w-[450px] gap-3">
            <div>
              <h4 className="text-2xl font-semibold">Login </h4>
              <p className="text-gray-2 text-sm">
                Enter your email & password to login
              </p>
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
                  required
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  isError={!!errors.password}
                  className="bg-gray-5 placeholder:text-gray-3 px-9"
                />
                <LockKeyhole className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-3 scale-75" />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-3 scale-75 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-3 scale-75 cursor-pointer"
                  />
                )}
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
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
                "Sign In"
              )}
            </Button>
            <p className="text-gray-2 text-center">
              Don’t have any account?{" "}
              <Link to={"/sign-up"} className="text-brand-3">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;

export async function action({ request }: Route.ActionArgs) {
  try {
    const user = await authenticator.authenticate("user-pass", request);

    const session = await sessionStorage.getSession(
      request.headers.get("cookie")
    );
    session.set("user", user);

    return redirect("/", {
      headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
  } catch (error) {
    return {
      error: (error as Error).message || "Sign-in failed. Please try again.",
    };
  }
}
