import { Avatar, AvatarFallback } from "~/components/ui/avatar";

const Header = () => {
  return (
    <div className="h-16 bg-white w-full sticky top-0 left-0 px-5 flex items-center justify-between">
      <p className="text-xl">{document.title}</p>
      <Avatar>
        <AvatarFallback className="bg-brand-2 text-white">AH</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Header;
