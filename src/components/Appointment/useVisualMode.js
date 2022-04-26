import { useState } from 'react';

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (value, replace = false) => {
    if (replace) {
      // Set the new mode
      // Update history state to keep track of it
      setMode((prev) => value);
      let replaceHistory = [...history];
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory((prev) => replaceHistory);
    } else {
      // Set the new mode
      // Update history state to keep track of it
      setMode((prev) => value);
      let newHistory = [...history];
      newHistory.push(value);
      setHistory((prev) => newHistory);
    }
  };
  // Function that sets the history state to go back
  // to the last history (ie. remove the last added item in array)
  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => {
        const newArr = prev.slice(0, -1);
        return newArr;
      });
    }
  }
  return { mode, transition, back };
}

// use in application
// function App() {
//   const { mode, transition } = useVisualMode(FIRST);

//   transition(SECOND);
