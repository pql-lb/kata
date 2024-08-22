import React, { useContext } from "react";
import { Context } from "../../context/store";
import { Structure } from "../types/main";

const names = ["Apples", "Oranges", "Bananas", "Lemons"];
const List = React.memo(() => {
    const { prices } = useContext(Context);
    return prices ? (
        <div>
            {prices.map((item: Structure, index) => {
                console.log(item);
                return (
                    <div key={item.id}>
                        <p>{names[index]}</p>
                        <p>item.id</p>
                    </div>
                );
            })}
        </div>
    ) : null;
});
export default List;
