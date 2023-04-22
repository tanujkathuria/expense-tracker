import { useState } from "react";

interface Props {
  items: string[];
  name: string;
  onSelectItem: (item: string) => void;
}

export default function ListGroup({ items, name, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // EVENT HANDLER
  const handleClick = (e: React.MouseEvent, index: number, item: string) => {
    console.log(e);
    setSelectedIndex(index);
    onSelectItem(item);
  };

  return (
    <>
      <h1>{name} group</h1>
      {items.length == 0 && <p>no item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={(e) => handleClick(e, index, item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
