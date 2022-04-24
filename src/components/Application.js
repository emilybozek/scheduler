import React, { useState, useEffect } from 'react';
import 'components/Application.scss';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import axios from 'axios';

const appointments = {
  1: {
    id: 1,
    time: '12pm',
  },
  2: {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 3,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  3: {
    id: 3,
    time: '2pm',
  },
  4: {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Archie Andrews',
      interviewer: {
        id: 4,
        name: 'Cohana Roy',
        avatar: 'https://i.imgur.com/FK8V841.jpg',
      },
    },
  },
  5: {
    id: 5,
    time: '4pm',
  },
};

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState({});
  const [interviewers, setInterviewers] = useState({});

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      console.log('all: ', all);

      setDays(all[0]);
      setAppointments(all[1]);
      setInterviewers(all[2]);
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
          <DayList days={days} value={day} onChange={setDay} />
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