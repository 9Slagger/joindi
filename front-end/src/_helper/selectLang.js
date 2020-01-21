export default (en, th) => {
  return localStorage.getItem("lang") === "th" ? th : en;
};
