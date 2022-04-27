import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (value, replace = false) => {
    if (replace) {
      setHistory((prev) => {
        const newArr = prev.slice(0, -1);
        return [...newArr, value];
      });
    } else {
      setHistory((prev) => {
        return [...prev, value];
      });
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => {
        const newArr = prev.slice(0, -1);
        return newArr;
      });
    }
  };

  const mode = history[history.length - 1];

  return { mode, transition, back };
}

// use in application
// function App() {
//   const { mode, transition } = useVisualMode(FIRST);

//   transition(SECOND);
