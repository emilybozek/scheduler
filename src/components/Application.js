import React, { useState, useEffect } from 'react';
import './Application.scss';
import DayList from '../components/DayList';
import Appointment from '../components/Appointment';
import axios from 'axios';
import { getAppointmentsForDay } from '../helpers/selectors';

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);
  // eslint-disable-next-line
  const [appointments, setAppointments] = useState({});
  // eslint-disable-next-line
  const [interviewers, setInterviewers] = useState({});
  const dailyAppointments = getAppointmentsForDay(day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setDays(all[0].data);
      setAppointments(all[1].data);
      setInterviewers(all[2].data);
    });
  }, []);

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
      <section className="schedule">{schedule}</section>
    </main>
  );
}
