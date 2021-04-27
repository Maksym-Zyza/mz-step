import React from "react";

export default function Lots({ lots }) {
  return (
    <div>
      {/* Lots */}
      <h3 className="message">Lots:</h3>
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

          {lots.map(
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
  );
}
