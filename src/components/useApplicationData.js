import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const getSpotsForDay = (dayObj, appointments) => {
    let spots = 0;
    dayObj.appointments.forEach((id) => !appointments[id].interview && spots++);
    return spots;
  };

  const updateSpots = (dayName, days, appointments) => {
    const dayObj = days.find((day) => day.name === dayName);

    const spots = getSpotsForDay(dayObj, appointments);

    const newDay = { ...dayObj, spots };
    const newDays = days.map((day) => (day.name === dayName ? newDay : day));

    return newDays;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const urlBook = `http://localhost:8001/api/appointments/${id}`;

    return axios.put(urlBook, { interview }).then((response) => {
      setState((prev) => {
        const days = updateSpots(prev.day, prev.days, appointments);
        return {
          ...prev,
          appointments,
          days,
        };
      });
    });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const urlDelete = `http://localhost:8001/api/appointments/${id}`;

    return axios.delete(urlDelete).then((response) => {
      setState((prev) => {
        const days = updateSpots(prev.day, prev.days, appointments);
        return { ...prev, appointments, days };
      });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
