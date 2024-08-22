import React, { useCallback, useContext } from "react";
import { Context } from "../../context/store";
import { Structure } from "../types/main";
import { Button } from "../atoms/Button";

const names = ["Apples", "Oranges", "Bananas", "Lemons"];
const List = React.memo(() => {
    const { prices } = useContext(Context);
    const handleClick = useCallback(() => {}, []);
    return prices ? (
        <div>
            {prices.map((item: Structure, index) => {
                console.log(item);
                return (
                    <div key={item.id}>
                        <p>{names[index]}</p>
                        <p>item.id</p>
                        <Button
                            string="Add to Cart"
                            handleClick={handleClick}
                        />
                    </div>
                );
            })}
        </div>
    ) : null;
});
export default List;
