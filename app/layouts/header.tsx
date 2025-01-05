import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useSubmit } from "react-router";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const Header = ({ userName }: { userName: string }) => {
  const submit = useSubmit();

  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (document) {
      setTitle(document?.title);
    }
  }, [location]);

  function getShortName(name: string): string {
    const words = name.split(/[\s-]+/); // Split name by spaces or hyphens
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase(); // Return the initial of the single word
    }
    return (
      words[0].charAt(0).toUpperCase() + // First word's initial
      words[words.length - 1].charAt(0).toUpperCase() // Last word's initial
    );
  }

  return (
    <div className="h-16 bg-white w-full sticky top-0 left-0 px-5 flex items-center justify-between">
      <p className="text-xl">{title}</p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-brand-2 text-white">
              {getShortName(userName)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will logout your account from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant={"destructive"}
              onClick={() =>
                submit(null, { action: "/logout", method: "post" })
              }
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Header;
