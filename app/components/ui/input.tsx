import * as React from "react";

import { cn } from "~/lib/utils";
interface InputProps extends React.ComponentProps<"input"> {
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 text-base  ring-offset-white placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400",
          isError
            ? "ring-2 ring-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-500"
            : "border border-neutral-200 bg-white focus-visible:ring-brand-1 dark:border-neutral-800 dark:bg-neutral-950 dark:focus-visible:ring-neutral-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
