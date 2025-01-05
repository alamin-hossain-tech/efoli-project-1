import * as React from "react";

import { cn } from "~/lib/utils";
interface TextAreaProps extends React.ComponentProps<"textarea"> {
  isError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, isError, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
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
Textarea.displayName = "Textarea";

export { Textarea };
