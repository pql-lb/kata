import React from "react";

export const PriceDisplay = React.memo(
    ({ final }: { final: String | Number }) => {
        return (
            <div>
                <p>
                    Final Price: <span>{String(final)}</span>
                </p>
            </div>
        );
    }
);
