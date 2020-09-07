import React, { useCallback } from "react";
import List from "./important-list";

const type: string = "important";

const ItemList = () => {
  const handleClick = useCallback(
    (item) => {
      console.log("You clicked on Number ", item);
    },
    [type]
  );

  return <List type={type} handleClick={handleClick}></List>;
};

export default ItemList;
