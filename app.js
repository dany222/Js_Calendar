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
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDay = date.getDate();
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
  headline.innerHTML = `<span id='year'>${date.getFullYear()}</span>, <span id='month'>${
    months[date.getMonth()]
  }</span>`;
  renderBody();
  makeYearChangeable();
  makeMonthChangeable();
  addTaskViewToDates();
}

function addTaskViewToDates() {
  const dates = document.querySelectorAll("td");
  dates.forEach(element =>
    element.addEventListener("click", () => {
      const container = document.createElement("div");
      container.setAttribute("class", "task-container");
      
    })
  );
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
    if (
      d === currentDay &&
      date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth
    ) {
      html += `<td id='today'>${d}</td>`;
    } else {
      html += `<td>${d}</td>`;
    }
    cellIndex++;
    if (cellIndex % 7 === 0) {
      html += "</tr><tr>";
    }
  });
  html += "</tr></tbody></table>";

  main.innerHTML = html;
}

function makeYearChangeable() {
  const year = document.getElementById("year");
  year.addEventListener("click", () => {
    let html = `<select id='year-select'>`;
    if (currentYear < date.getFullYear()) {
      for (let i = 0; i < 30; i++) {
        html += `<option value=${date.getFullYear() - i}>${date.getFullYear() -
          i}</option>`;
      }
    } else {
      for (let i = 0; i < 30; i++) {
        html += `<option value=${currentYear - i}>${currentYear - i}</option>`;
      }
    }
    html += "<select>";
    year.innerHTML = html;
  });
  year.addEventListener("change", () => {
    let yearValue = document.getElementById("year-select").value;
    date.setFullYear(yearValue);
    renderPage();
  });
}

function makeMonthChangeable() {
  const month = document.getElementById("month");
  month.addEventListener("click", () => {
    let html = `<select id='month-select'>`;
    for (let i = 0; i < months.length; i++) {
      html += `<option value=${i}>${months[i]}</option>`;
    }
    html += `</select>`;
    month.innerHTML = html;
  });
  month.addEventListener("change", () => {
    let monthValue = document.getElementById("month-select").value;
    date.setMonth(monthValue);
    renderPage();
  });
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
