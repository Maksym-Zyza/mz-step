import React, { useState } from "react";

export default function SearchForm({ lots }) {
  const [minDateSt, setMinDate] = useState("2020-01-01");
  const updateMinDate = (e) => {
    setMinDate(e.target.value);
    // console.log(Number(e.target.value.replace(/-/, "").replace(/-/, "")));
  };

  const [maxDateSt, setMaxDate] = useState("2021-12-31");
  const updateMaxDate = (e) => {
    setMaxDate(e.target.value);
  };
  const [sumStartSt, setSumStart] = useState("0");
  const updateSumStart = (e) => {
    setSumStart(e.target.value);
  };

  const [sumEndSt, setSumrEnd] = useState("100000000");
  const updateSumrEnd = (e) => {
    setSumrEnd(e.target.value);
  };

  const [selSt, setSelectActiv] = useState("Всі статуси");
  const updateSelectActiv = (e) => {
    setSelectActiv(e.target.value);
  };

  const startSearch = () => {
    const minDate = Number(minDateSt.replace(/-/, "").replace(/-/, ""));
    const maxDate = Number(maxDateSt.replace(/-/, "").replace(/-/, ""));
    const sumStart = Number(sumStartSt);
    const sumEnd = Number(sumEndSt);
    const selectActiv = selSt;

    console.log(minDate);
    console.log(maxDate);
    console.log(sumStart);
    console.log(sumEnd);
    console.log(selectActiv);
    console.log(lots);

    const filterSum = lots.filter(
      (arr) =>
        Number(
          arr.expected_cost
            .split("")
            .join("")
            .replace(/\s+/g, "")
            .replace(/,/, ".")
        ) <= maxDate &&
        Number(
          arr.expected_cost
            .split("")
            .join("")
            .replace(/\s+/g, "")
            .replace(/,/, ".")
        ) >= sumStart
    );
    console.log("Фильтр по даті та сумі:", filterSum.length);
  };

  return (
    <>
      <section className="selection">
        <div className="form_conteiner">
          <ul className="form-list">
            <li className="form-item">
              <label className="form-field">
                <input
                  className="input_date"
                  type="date"
                  id="date_start"
                  name="date-start"
                  value={minDateSt}
                  min="2020-01-01"
                  max="2040-12-31"
                  onChange={updateMinDate}
                />
                <input
                  className="input_date"
                  type="date"
                  id="date_end"
                  name="date-end"
                  value={maxDateSt}
                  min="2020-01-01"
                  max="2040-12-31"
                  onChange={updateMaxDate}
                />
              </label>
            </li>
            <li className="form-item">
              <label className="form-field">
                <select
                  className="select_sum"
                  id="select-start"
                  onChange={updateSumStart}
                >
                  <option value="0">0</option>
                  <option value="100">100</option>
                  <option value="1000">1000</option>
                  <option value="10000">10000</option>
                  <option value="100000">100000</option>
                  <option value="1000000">1000000</option>
                  <option value="10000000">10000000</option>
                  <option value="100000000">100000000</option>
                </select>
                <select
                  className="select_sum"
                  id="select-end"
                  onChange={updateSumrEnd}
                >
                  <option value="1000000000">1000000000</option>
                  <option value="100000000">100000000</option>
                  <option value="10000000">10000000</option>
                  <option value="1000000">1000000</option>
                  <option value="100000">100000</option>
                  <option value="100000">100000</option>
                  <option value="10000">10000</option>
                </select>
                <span className="form-label"></span>
              </label>
            </li>
            <li>
              <form
                className="search-form"
                id="search-form"
                onChange={updateSelectActiv}
              >
                <select className="select" id="select">
                  <option value="Всі статуси">Всі статуси закупівлі</option>
                  <option value="Активний">Активний лот закупівлі</option>
                  <option value="Завершено">Завершено лот закупівлі</option>
                  <option value="Неуспішний">Неуспішний лот закупівлі</option>
                  <option value="Скасовано">Скасовано лот закупівлі</option>
                </select>
              </form>
            </li>
          </ul>

          <button
            className="load-more-button is-hidden"
            type="button"
            onClick={startSearch}
          >
            Пошук
          </button>
        </div>
      </section>
    </>
  );
}
