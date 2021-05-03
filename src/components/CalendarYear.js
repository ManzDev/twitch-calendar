import "./CalendarMonth.js";

class CalendarYear extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return `
      .year-number {
        font-family: Montserrat, sans-serif;
        font-weight: 800;
        font-size: 42px;
        color: white;
        text-align: center;
        background: #39399a;
        padding: 5px;
        margin: 2px;
      }
    `;
  }

  connectedCallback() {
    const now = new Date();
    this.yearNumber = Number(this.getAttribute("year")) || now.getFullYear();
    this.render();
  }

  get generateMonths() {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    return months;
  }

  getMonths() {
    return this.generateMonths
      .map(monthNumber => `<calendar-month month="${monthNumber}" year="${this.yearNumber}"></calendar-month>`).join("");
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${CalendarYear.styles}</style>
    <div class="year-number">${this.yearNumber}</div>
    <div class="months">
      ${this.getMonths()}
    </div>
    `;
  }
}

customElements.define("calendar-year", CalendarYear);
