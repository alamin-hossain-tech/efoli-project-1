import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { getShortName } from "~/lib/functions/getShortName";
import { getUser } from "~/lib/functions/getUser";
import type { Route } from "./+types/profile";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Profile" }];
}
const ProfilePage = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData;
  return (
    <div className="h-full flex justify-center ">
      <div className="w-1/3 p-4 rounded-lg bg-white flex flex-col items-center">
        <Avatar>
          <AvatarFallback>{getShortName(user.name)}</AvatarFallback>
        </Avatar>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  return user;
}
