import React, { useState } from 'react';

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

  const back = () => {
    // Get history
    // Get the previous mode from history
    // Update history with the new state (removing the last mode)
    // Set the mode to the previous mode
    // Push or Pop the state
    const back = () => {
      let newHistory = [...history];
      newHistory.pop(mode);
      setHistory((prev) => newHistory);
      if (history.length > 1) {
        setMode((prev) => newHistory[newHistory.length - 1]);
      }
    };
  };
  return { mode, transition, back };
}

// use in application
// function App() {
//   const { mode, transition } = useVisualMode(FIRST);

//   transition(SECOND);
