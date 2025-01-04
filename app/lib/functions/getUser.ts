import { sessionStorage } from "../auth/session.server";

export async function getUser(request: Request): Promise<AuthUser> {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  return session.get("user");
}
