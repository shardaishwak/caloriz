import { digitize } from "./time";

const log = (i: string, m: any) => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const format =
    digitize(hours) + ":" + digitize(minutes) + ":" + digitize(seconds);

  console.log("%c" + "[" + format + "]" + i, "color: green;");
  console.log(m);
  console.log("=============================");
};

export default log;
