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
  function bookInterview(id, interview) {
    const appointment = {
      ...appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...appointments,
      [id]: appointment,
    };
  }

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
            />
          );
        })}
      </section>
    </main>
  );
}
