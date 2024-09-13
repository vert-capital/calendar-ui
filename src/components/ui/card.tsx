import React from "react";

const Card = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
    ({ children }, ref) => {
        return (
        <div ref={ref} className="bg-white shadow-md rounded-lg p-6">
            {children}
        </div>
        );
    }
    );

export default Card;