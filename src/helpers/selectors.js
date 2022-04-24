// Return an arry of appointment data for a specified day
export default function getAppointmentsForDay(day, days, appointments) {
  const results = []
  const checkDay = days.filter((d) => d.name === day);
  if (!checkDay) {
    return []
  }
  const keys = Object.keys(appointments);
  for (const elem of keys) {
      if (elem == checkDay[0].id) {
        results.push(appointments[elem])
      }
  }
  return results;
};
