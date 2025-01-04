import { Loader2 } from "lucide-react";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { authenticator } from "~/lib/auth/auth.server";
import type { Route } from "./+types/login";
import { sessionStorage } from "~/lib/auth/session.server";

const LoginPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData();
  console.log({ actionData });
  return (
    <>
      <Form method="post">
        <div className="flex h-screen justify-center items-center px-4">
          <div className="flex flex-col border border-gray-200 p-4 lg:p-5 rounded bg-white min-w-full lg:min-w-96  gap-3">
            <h4>Sign In</h4>
            <input placeholder="Email" type="email" name="email" required />
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="Password"
            />
            <input
              type="text"
              name="adminType"
              value={"superAdmin"}
              hidden
              readOnly
            />
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default LoginPage;

export async function action({ request }: Route.ActionArgs) {
  // we call the method with the name of the strategy we want to use and the
  // request object
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
