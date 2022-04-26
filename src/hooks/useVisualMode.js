import React, { useState } from 'react';

const FIRST = 'FIRST';
const SECOND = 'SECOND';
const THIRD = 'THIRD';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(value) {
    // Set the new mode
    // Update history state to keep track of it
    setMode(value);
    setHistory((prev) => [...prev, value]);
  }

  function back(history) {
    // Get history
    // Get the previous mode from history
    // Update history with the new state (removing the last mode)
    // Set the mode to the previous mode
    // Push or Pop the state
    previousMode = history[history.length - 1];
    console.log(history)
    setMode(previousMode);
    setHistory(previousMode)
    // If there is no previousMode, don't allow the setMode
  }

  return { mode, transition, back };
}

function App() {
  const { mode, transition } = useVisualMode(FIRST);

  transition(SECOND);
}
