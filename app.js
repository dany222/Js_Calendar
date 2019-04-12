const headline = document.getElementById("header-text");
const main = document.getElementById("main");
const moveForward = document.getElementById("move-forward");
const moveBack = document.getElementById("move-back");

const weekdates = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const date = new Date();

window.onload = renderPage();

moveForward.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderPage();
});

moveBack.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderPage();
});

function renderPage() {
  headline.innerHTML = date.getFullYear() + ", " + months[date.getMonth()];
  renderBody(date.getMonth());
}

function renderBody() {
  const datesInMonth = getdatesInGivenMonth();
  const month = date.getMonth();

  const firstDayOfMonth = () => {
    if (getFirstDayOfGivenMonth(month) === 0) {
      return 6;
    } else {
      return getFirstDayOfGivenMonth(month) - 1;
    }
  };
  let html = "<table><thead><tr>";
  let cellIndex = 0;

  weekdates.forEach(v => (html += `<td>${v}</td>`));
  html += "</tr></thead><tbody><tr>";
  for (let i = 0; i < firstDayOfMonth(); i++) {
    html += "<td></td>";
    cellIndex++;
  }
  datesInMonth.forEach(d => {
    html += `<td>${d}</td>`;
    cellIndex++;
    if (cellIndex % 7 === 0) {
      html += "</tr><tr>";
    }
  });
  html += "</tr></tbody></table>";

  main.innerHTML = html;
}

/**
 *
 * @param {number} year
 * @param {number} month
 * @returns {number[]}
 */
function getdatesInGivenMonth(
  month = date.getMonth(),
  year = date.getFullYear()
) {
  let innerDate = new Date(year, month, 1);
  const dates = new Array();

  while (innerDate.getMonth() === month) {
    dates.push(innerDate.getDate());
    innerDate.setDate(innerDate.getDate() + 1);
  }

  return dates;
}

/**
 *
 * @param {number} year
 * @param {number} month
 * @returns {number} Weekday-based representation of first date in the month
 */
function getFirstDayOfGivenMonth(
  month = date.getMonth(),
  year = date.getFullYear()
) {
  return new Date(year, month, 1).getDay();
}
