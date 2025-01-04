import { useEffect, useState } from "react";
import { useLocation, useSubmit } from "react-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

const Header = () => {
  const submit = useSubmit();
  const [title, setTitle] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (document) {
      setTitle(document?.title);
    }
  }, [location]);
  return (
    <div className="h-16 bg-white w-full sticky top-0 left-0 px-5 flex items-center justify-between">
      <p className="text-xl">{title}</p>
      <Avatar
        onClick={() => submit(null, { action: "/logout", method: "post" })}
      >
        <AvatarFallback className="bg-brand-2 text-white">AH</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Header;
