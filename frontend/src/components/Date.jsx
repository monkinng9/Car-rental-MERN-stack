export function getCurrentDate(separator = '') {

  let newCurrentDate = new Date();
  let date_raw = newCurrentDate.getDate();
  let month_raw = newCurrentDate.getMonth() + 1;
  let year = newCurrentDate.getFullYear();
  let hours = newCurrentDate.getHours();
  let min = newCurrentDate.getMinutes();

  

  return newCurrentDate
}