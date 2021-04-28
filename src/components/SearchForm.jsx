import React, { useState, useEffect } from "react";

export default function SearchForm({ lots }) {
  const [minDateSt, setMinDate] = useState("2020-01-01");
  const updateMinDate = (e) => {
    setMinDate(e.target.value);
  };

  const [maxDateSt, setMaxDate] = useState("2040-12-31");
  const updateMaxDate = (e) => {
    setMaxDate(e.target.value);
  };
  useEffect(() => {
    // Поточна дата
    var today =
      new Date().getFullYear() +
      "-" +
      ("0" + (new Date().getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date().getDate()).slice(-2);
    setMaxDate(today);
  }, [lots]);

  const [sumStartSt, setSumStart] = useState("0");
  const updateSumStart = (e) => {
    setSumStart(e.target.value);
  };

  const [sumEndSt, setSumrEnd] = useState("1000000000");
  const updateSumrEnd = (e) => {
    setSumrEnd(e.target.value);
  };

  const [selSt, setSelect] = useState("Всі статуси");
  const updateSelect = (e) => {
    setSelect(e.target.value);
  };
  const [activLots, setActivLots] = useState("");
  useEffect(() => {
    const foundLotsActiv = lots.filter((arr) =>
      arr.lot_status.split(" ").join("").includes("Активний")
    );
    setActivLots(foundLotsActiv.length);
  }, [lots]);

  const [foundLots, setFoundLots] = useState("");
  useEffect(() => {
    setFoundLots(lots.length);
  }, [lots]);

  const startSearch = () => {
    const minDate = Number(minDateSt.replace(/-/, "").replace(/-/, ""));
    const maxDate = Number(maxDateSt.replace(/-/, "").replace(/-/, ""));
    const minSum = Number(sumStartSt);
    const maxSum = Number(sumEndSt);
    const select = selSt;

    console.log(minDate, maxDate, minSum, maxSum, select);
    console.log(lots);

    // Фільтр по даті
    const filterDate = lots.filter(
      (lot) =>
        Number(lot.date_publication.split(".").reverse().join("")) <= maxDate &&
        Number(lot.date_publication.split(".").reverse().join("")) >= minDate
    );
    // console.log("Фильтр по даті:", filterDate.length);

    // Фільтр по сумі та даті
    const filterSum = filterDate.filter(
      (arr) =>
        Number(
          arr.expected_cost
            .split("")
            .join("")
            .replace(/\s+/g, "")
            .replace(/,/, ".")
        ) <= maxSum &&
        Number(
          arr.expected_cost
            .split("")
            .join("")
            .replace(/\s+/g, "")
            .replace(/,/, ".")
        ) >= minSum
    );
    // console.log("Фильтр по даті та сумі:", filterSum.length);

    // Фільтер по статусу
    if (select !== "Всі статуси") {
      const filterLots = filterSum.filter((arr) =>
        arr.lot_status.split(" ").join("").includes(select)
      );

      setFoundLots(filterLots.length);
      // console.log(`За параметрами пошуку: "${select}": ${filterLots.length}`);
    } else setFoundLots(filterSum.length);

    // Кількість Активних лотів
    const filterLotsActiv = filterSum.filter((arr) =>
      arr.lot_status.split(" ").join("").includes("Активний")
    );
    setActivLots(filterLotsActiv.length);
    // console.log(`Активних лотів: ${filterLotsActiv.length}`);
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
                onChange={updateSelect}
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
      <div className="result-div">
        <h3 className="result">Всього лотів: {lots.length}</h3>
        <h3 className="result">Активних лотів: {activLots}</h3>
        <h3 className="result">Знайдено за параметрами пошуку: {foundLots}</h3>
      </div>
    </>
  );
}
