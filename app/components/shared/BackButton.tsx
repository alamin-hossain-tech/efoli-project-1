import { ChevronLeft } from "lucide-react";
import { Link, type To } from "react-router";
import { Button } from "../ui/button";

const BackButton = () => {
  return (
    <Button variant={"outline"} size={"icon"} asChild>
      <Link to={-1 as To}>
        <ChevronLeft />
      </Link>
    </Button>
  );
};

export default BackButton;
