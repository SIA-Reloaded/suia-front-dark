const verboseMonth = (month, abbr) => {
  const monthListAbbr = ['En.', 'Febe.', 'Mzo.', 'Abr.', 'My.', 'Jun.', 'Jul.', 'Agt.', 'Sept.', 'Oct.', 'Nov.', 'Dic.'];
  const monthList = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  if (abbr) {
    return monthListAbbr[month];
  }
  return monthList[month];
}

export const parseDate = (dateStr, abbr=true) => {
  const date = new Date(dateStr);
  return `${ date.getDate() } de ${ verboseMonth(date.getMonth(), abbr) } de ${ date.getFullYear() }`
}