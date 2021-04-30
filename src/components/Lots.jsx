import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";

export default function Lots({ lots }) {
  const [lotsSt, setLots] = useState([]);
  useEffect(() => {
    setLots(lots);
  }, [lots]);

  const getLots = (filteredLots) => {
    setLots(filteredLots);
    console.log("filteredLots>", filteredLots);
  };

  return (
    <>
      {!lots ? (
        <h2 className="message">
          Не знайдено лотів, спробуйте будь ласка пізніше
        </h2>
      ) : (
        <>
          {<SearchForm lots={lots} getLots={getLots} />}
          <div>
            {/* Lots */}
            <section>
              <table className="table gallery js-gallery">
                <thead className="gallery__item table_title">
                  <tr>
                    <th>Дата</th>
                    <th>Лот</th>
                    <th>Очікувана вартість</th>
                    <th>Організатор</th>
                    <th>Переможець</th>
                    <th>Статус лота</th>
                    <th>Статус процедури</th>
                    <th>Процедура закупівлі</th>
                    <th>Посилання</th>
                  </tr>
                </thead>

                {lotsSt.map(
                  ({
                    id,
                    date_publication,
                    lot,
                    expected_cost,
                    organizer,
                    winner,
                    lot_status,
                    status_proc,
                    buy_proc,
                    https,
                  }) => (
                    <thead className="gallery_lot" key={id}>
                      <tr data-id={id}>
                        <th> {date_publication}</th>
                        <th> {lot}</th>
                        <th> {expected_cost}</th>
                        <th> {organizer}</th>
                        <th> {winner}</th>
                        <th> {lot_status}</th>
                        <th> {status_proc}</th>
                        <th> {buy_proc}</th>
                        <th>
                          <a href={https} target="_blank" rel="noreferrer">
                            <span className="lot_link">Лот</span>
                          </a>
                        </th>
                      </tr>
                    </thead>
                  )
                )}
              </table>
            </section>
          </div>

          {/* Cкролл вверх страницы */}
          <a className="toTopBtn" href="/#" id="toTop">
            <div className="icon">&#8593;</div>
          </a>
        </>
      )}
    </>
  );
}
