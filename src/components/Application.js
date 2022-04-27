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
import useApplicationData from './useApplicationData';

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  console.log('DAILY INTERVIEWERS', dailyInterviewers);
  console.log('DAILY APPOINTMENTS', dailyAppointments);

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
          <DayList value={state.day} days={state.days} onChange={setDay} />
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
          const interview = getInterview(state, appointment.interview);

          console.log('GET INTERVIEW', interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
      </section>
    </main>
  );
}
