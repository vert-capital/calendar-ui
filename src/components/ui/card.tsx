import React from "react";

import { cn } from "@/lib";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: Props) => {
  return (
    <div className={cn("bg-white shadow-md rounded-lg p-6", className)}>
      {children}
    </div>
  );
};
