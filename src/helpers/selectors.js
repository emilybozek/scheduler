export const getAppointmentsForDay = (day, days, appointments) => {
  let appointmentIds = []
  let results = [];
  for (const x of days) {
    if (x.name === day) {
      appointmentIds = x.appointments;
    }
  }
  const keys = Object.keys(appointments);
  for (let y of appointmentIds) {
    for (let z of keys) {
      if (y === Number(z)) {
        results.push(appointments[z]);
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
  console.log("INTERVIEWER INFO", interviewerInfo)
  console.log("INTERVIEW STUDENT", interview.student)
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
};

export const getInterviewersForDay = (day, days, interviewers) => {
  let interviewerIds = []
  let results = [];
  for (const x of days) {
    if (x.name === day) {
      interviewerIds = x.interviewers;
    }
  }
  const keys = Object.keys(interviewers);
  for (let x of interviewerIds) {
    for (let y of keys) {
      if (x === Number(y)) {
        results.push(interviewers[y]);
      }
    }
  }
  return results;
}
