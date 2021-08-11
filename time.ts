import moment from "moment";

export const daysInMonth = (month, year) => {
  const days = moment(year + "-" + month).daysInMonth();

  const month_list = [];
  for (var i = 1; i <= days; i++) {
    const str = transform_date_to_string(i, month, year);
    month_list.push(str);
  }
  return month_list;
};

export const transform_week_to_string = (week) =>
  [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ][parseInt(week)];

export const transform_month_to_string = (month) =>
  [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ][parseInt(month)];

export const get_week_of_date = (day, month, year) =>
  new Date(moment().year(year).month(month).date(day).toISOString()).getDay();

export const formatted_get_week_of_date = (date) => {
  const unformat = extract_data_from_date(date);
  return get_week_of_date(unformat[0], unformat[1], unformat[2]);
};

export const transform_date_to_string = (day, month, year) =>
  `${digitize(day)}-${digitize(month)}-${year}`;

export function extract_data_from_date(date: string) {
  if (date.length !== 10)
    throw Error("Unvalid date format. Should be DD-MM-YYYY");

  return [
    date[0] + date[1],
    date[3] + date[4],
    date[6] + date[7] + date[8] + date[9],
  ];
}

export const todayDate = () => {
  const date = new Date();
  const id_date = transform_date_to_string(
    date.getDate(),
    date.getMonth(),
    date.getFullYear()
  );

  return id_date;
};

export const digitize = (n) => ((n.toString().length < 2 && "0") || "") + n;
