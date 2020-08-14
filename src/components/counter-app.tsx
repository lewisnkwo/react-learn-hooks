import React, { useState } from "react";

interface Props {
  count: number;
}

const CounterApp = (props: Props) => {
  const [count, setCount] = useState(props.count);
  const [text, setText] = useState("");

  return (
    <div>
      <p>
        The current {text || "count"} is {count}
      </p>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>reset</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default CounterApp;
