import React from "react";

interface Props {
  handleClick: (item: any) => void;
  type: string;
}

const ImportantList = ({ handleClick }: Props) => {
  const items = [
    {
      number: 1,
    },
    {
      number: 2,
    },
    {
      number: 3,
    },
    {
      number: 4,
    },
    {
      number: 5,
    },
  ];

  const renderElement = (item: any) =>
    item.map(() => <div onClick={handleClick}>{item}</div>);

  return <div>{items.map(renderElement)}</div>;
};

export default ImportantList;
