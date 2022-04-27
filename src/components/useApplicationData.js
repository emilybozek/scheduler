import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [day, setDay] = useState('Monday');
  console.log('SET DAY', setDay, 'DAY', day);
  const [days, setDays] = useState([]);
  console.log('SET DAYS', setDays, 'DAYS', days);
  const [appointments, setAppointments] = useState({});
  console.log(
    'SET APPOINTMENTS',
    setAppointments,
    'APPOINTMENTS',
    appointments
  );
  const [interviewers, setInterviewers] = useState({});
  console.log(
    'SET INTERVIEWERS',
    setInterviewers,
    'INTERVIEWERS',
    interviewers
  );

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      setDays(all[0].data);
      setAppointments(all[1].data);
      setInterviewers(all[2].data);
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
      ...appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...appointments,
      [id]: appointment,
    };

    const urlBook = `http://localhost:8001/api/appointments/${id}`;

    return axios.put(urlBook, { interview }).then((response) => {
      setDay((prev) => {
        const days = updateSpots(prev.day, prev.days, appointments);
        return {
          ...prev,
          appointments,
          days,
        };
      });
    });
  }

  // axios request to delete interview
  const cancelInterview = (id) => {
    const appointment = {
      ...appointments[id],
      interview: null,
    };

    const appointments = {
      ...appointments,
      [id]: appointment,
    };

    const urlDelete = `/api/appointments/${id}`;

    return axios.delete(urlDelete).then((response) => {
      setDays((prev) => {
        const days = updateSpots(prev.day, prev.days, appointments);
        return { ...prev, appointments, days };
      });
    });
  };

  return {
    day,
    days,
    appointments,
    interviewers,
    setDay,
    setDays,
    setAppointments,
    setInterviewers,
    bookInterview,
    cancelInterview,
  };
}
