import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  return (
    <Button variant={"outline"} size={"icon"}>
      <ChevronLeft />
    </Button>
  );
};

export default BackButton;
