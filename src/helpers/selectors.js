export const getAppointmentsForDay = (day, days, appointments) => {
  let appointmentIds = []
  let results = [];
  for (const item of days) {
    if (item.name === day) {
      appointmentIds = item.appointments;
    }
  }
  const keys = Object.keys(appointments);
  for (let x of appointmentIds) {
    for (let y of keys) {
      if (x === Number(y)) {
        results.push(appointments[y]);
      }
    }
  }
  return results;
};

export const getInterview = (interviewers, interview) => {
  if (!interview) {
    return null;
  }

  const interviewerInfo = interviewers[interview.interviewer];
  
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
};

