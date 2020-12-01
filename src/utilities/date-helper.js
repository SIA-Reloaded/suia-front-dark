const verboseMonth = (month, abbr) => {
  const monthListAbbr = ['En.', 'Febe.', 'Mzo.', 'Abr.', 'My.', 'Jun.', 'Jul.', 'Agt.', 'Sept.', 'Oct.', 'Nov.', 'Dic.'];
  const monthList = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  if (abbr) {
    return monthListAbbr[month];
  }
  return monthList[month];
}

const verboseDay = (day, abbr) => {
  const dayListAbbr = ['lu.', 'ma.', 'mi.', 'ju.', 'vi.', 'sá.', 'do.'];
  const dayList = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const selectedList = abbr ? dayListAbbr : dayList;
  console.log(selectedList);
  switch(day) {
    case 'MO':
      return selectedList[0];

    case 'TU':
      return selectedList[1];

    case 'WE':
      return selectedList[2];

    case 'TH':
      return selectedList[3];

    case 'FR':
      return selectedList[4];

    case 'SA':
      return selectedList[5];

    case 'SU':
      return selectedList[6];
  }
}

export const parseDate = (dateStr, abbr=true) => {
  const date = new Date(dateStr);
  return `${ date.getDate() } de ${ verboseMonth(date.getMonth(), abbr) } de ${ date.getFullYear() }`
}

export const parseShedule = (schedule, abbr=false) =>  schedule.map(
  (date) => {
    return {
      day: verboseDay(date.day, abbr),
      hours: `${ date.startHours } - ${ date.endHours }`
    }
  }
)