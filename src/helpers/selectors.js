export const getAppointmentsForDay = (day, days, appointments) => {
  let results = [];
  const checkDay = days.filter((d) => d.name === day);
  const keys = Object.keys(appointments);
  for (let x of checkDay[0].appointments) {
    for (let y of keys) {
      if (x === Number(y)) {
        results.push(appointments[y]);
      }
    }
  }
  return results;
};

export const getInterview = (interviewers, appointments) => {
  let results = [];
  let interviewArr = [];
  let interviewerArr = [];
  const interviewersValues = Object.values(interviewers);
  const appointmentsValues = Object.values(appointments);
  for (let item of appointmentsValues) {
    interviewArr.push(item.interview);
  }

  const newArray = interviewArr.filter((element) => {
    return element !== null;
  });

  for (let item of newArray) {
    interviewerArr.push(item.interviewer);
  }
  for (let item of interviewerArr) {
    for (let y of interviewersValues) {
      if (item === y.id) {
        results.push(interviewers[y.id]);
      }
    }
  }
  return results;
};

export const getInterviewersForDay = () => {};
