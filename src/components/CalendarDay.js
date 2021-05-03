const WEEK_DAY = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export const toEuropeanFormat = (day) => day === 0 ? 6 : day - 1;

const getLocalDate = () => new Date().getFullYear() + "-" +
  (new Date().getMonth() + 1).toString().padStart(2, "0") + "-" +
  (new Date().getDate()).toString().padStart(2, "0");

const isToday = (date) => {
  const now = getLocalDate();
  const d = new Date(date);
  d.setDate(date.getDate() + 1);
  const value = now === d.toJSON().substring(0, 10);
  return value;
};

class CalendarDay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const now = new Date();
    const dateNumber = Number(this.getAttribute("day")) || now.getDate();
    const monthNumber = Number(this.getAttribute("month")) || now.getMonth() + 1;
    const yearNumber = Number(this.getAttribute("year")) || now.getFullYear();

    const date = new Date(yearNumber, monthNumber - 1, dateNumber);
    this.date = `<small>${date.toJSON()}</small>`;

    this.isToday = isToday(date);
    this.dateNumber = date.getDate();
    this.monthNumber = date.getMonth() + 1;
    this.yearNumber = date.getFullYear();
    this.dayNumber = toEuropeanFormat(date.getDay());
    this.render();
  }

  static get styles() {
    return `
      :host {
        display: inline-block;
        min-width: 90px;
        height: 60px;
        border: 1px solid #777;
        border-top: 8px solid #777;
        padding: 5px;
        margin: 2px;
        text-align: center;
      }
      :host(.today) {
        background: #73adeb;
        border-color: #233787;
      }
      :host([disabled]) {
        opacity: 0.2;
      }
      :host([festive]) {
        color: darkred;
        border-color: darkred;
      }
      :host([festive]) .day-number {
        color: darkred;
      }
      .day-name {
        font-family: Montserrat, sans-serif;
        font-wegith: 300;
      }
      .day-number {
        font-family: Montserrat, sans-serif;
        font-weight: 800;
        font-size: 30px;
        color: black;
      }
      @media screen and (max-width: 775px) {
        :host { min-width: 30px; }
        .rest { display: none; }
      }
    `;
  }

  getWeekDay() {
    const day = WEEK_DAY[this.dayNumber];
    const html = `${day.substring(0, 1)}<span class="rest">${day.substring(1)}</span>`;
    return html;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${CalendarDay.styles}</style>
      <div class="day-name">${this.getWeekDay()}</div>
      <div class="day-number">${this.dateNumber}</div>
    `;
    if (this.isToday) {
      this.classList.add("today");
    }
    if (this.dayNumber === 6) {
      this.setAttribute("festive", "");
    }
  }
}

customElements.define("calendar-day", CalendarDay);
