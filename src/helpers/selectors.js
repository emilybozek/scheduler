export const getAppointmentsForDay = (state, day) => {
  let appointmentIds = [];
  let results = [];
  for (const x of state.days) {
    if (x.name === day) {
      appointmentIds = x.appointments;
    }
  }
  for (let y of appointmentIds) {
    const keys = Object.keys(state.appointments);
    for (let z of keys) {
      if (y === Number(z)) {
        results.push(state.appointments[z]);
      }
    }
  }
  return results;
};

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    const interviewerId = interview.interviewer;
    const interviewerObj = { ...state.interviewers[interviewerId] };
    return { ...interview, interviewer: interviewerObj };
  }
};

export const getInterviewersForDay = (state, day) => {
  let interviewerIds = [];
  let results = [];
  for (const x of state.days) {
    if (x.name === day) {
      interviewerIds = x.interviewers;
    }
  }

  for (let x of interviewerIds) {
    const keys = Object.keys(state.interviewers);
    for (let y of keys) {
      if (x === Number(y)) {
        results.push(state.interviewers[y]);
      }
    }
  }
  return results;
};
