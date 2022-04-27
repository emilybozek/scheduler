import React, { useState, useEffect } from 'react';
import './Application.scss';
import DayList from '../components/DayList';
import Appointment from '../components/Appointment';
import axios from 'axios';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from '../helpers/selectors';

export default function Application(props) {

  // gets the spots for a given day:
  const getSpotsForDay = (dayObj, appointments) => {
    let spots = 0;
    dayObj.appointments.forEach((id) => !appointments[id].interview && spots++);
    return spots;
  };

  // Function that updates the spots remaining for given day
  const updateSpots = (dayName, days, appointments) => {
    // find the day object:
    const dayObj = days.find((day) => day.name === dayName);

    // calculate the spots for given day:
    const spots = getSpotsForDay(dayObj, appointments);

    // update the new day object into state without mutating state:
    const newDay = { ...dayObj, spots };
    const newDays = days.map((day) => (day.name === dayName ? newDay : day));

    return newDays;
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
  }

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

  const dailyAppointments = getAppointmentsForDay(day, days, appointments);
  const dailyInterviewers = getInterviewersForDay(day, days, interviewers);
  console.log('DAILY INTERVIEWERS', dailyInterviewers);
  console.log('DAILY APPOINTMENTS', dailyAppointments);

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

    // function thate makes Axios put request to book interview
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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList value={day} days={days} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          console.log('APPOINTMENT.INTERVIEW', appointment.interview);
          const interview = getInterview(interviewers, appointment.interview);

          console.log('GET INTERVIEW', interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
            />
          );
        })}
      </section>
    </main>
  );
}
