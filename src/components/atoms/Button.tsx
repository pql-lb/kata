import React from "react";

type Props = {
    dataTestid?: string;
    className?: string;
    handleClick: () => void;
    string: string;
    value?: string;
};

export const Button = React.memo(
    ({ dataTestid, className, handleClick, string, value }: Props) => {
        return (
            <button
                data-testid={dataTestid}
                className={`button ${className ? className : ""}`}
                data-value={value ? value : null}
                onClick={handleClick}
            >
                {string}
            </button>
        );
    }
);
