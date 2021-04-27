import React from "react";
import firebase from "firebase/app";

export default class App extends React.Component {
  state = {
    email: "",
    password: "",
    hasAccount: false,
    lots: {},
    // name: "",
    // key: "",
    // value: "",
  };

  componentDidMount() {
    const db = firebase.database();

    //===== Массив "name"
    // const name = db.ref("name");
    // name.on("value", (elem) => {
    //   this.setState({ name: elem.val() });
    //   console.log(this.state.name);
    // });

    const lots = db.ref("lots");
    lots.on("value", (elem) => {
      this.setState({ lots: elem.val() });
      console.log(this.state.lots);
    });

    //===== Массив "lots"
    // const ref = db.ref("lots");
    // ref.on("value", gotData, errData);

    // function gotData(data) {
    //   console.log(data.val());
    // }
    // function errData(err) {
    //   console.log("Error>>", err);
    // }
  }

  handleChenge = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    // ========= Registration
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((response) => console.log(`registration successful`, response))
    //   .catch((error) => console.log(error.message));

    // ========= signIn
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => alert(`Hello ${this.state.email}!`, response))
      .then(() => {
        this.setState({ hasAccount: true });
      })
      .catch((error) => alert(error.message));
  };

  // Запись в DataBase
  sendData = (e) => {
    e.preventDefault();

    const { key, value } = this.state;
    const db = firebase.database();
    db.ref(key).push(value);
    console.log("Your data was written to DataBase");
    // this.setState({ value: "" });
  };

  render() {
    const { hasAccount, lots } = this.state;
    // console.log(name, "name");
    // console.log(Object.values(name));
    // console.log(Object.keys(name));

    return (
      <div>
        {hasAccount ? (
          <div>
            {/* <h1 className="message">Enter your data</h1>

            <form
              className="flex_block"
              onSubmit={this.sendData}
              autoComplete="off"
            >
              <input
                type="text"
                id="key"
                placeholder="enter key"
                onChange={this.handleChenge}
              />
              <input
                type="text"
                id="value"
                placeholder="enter value"
                onChange={this.handleChenge}
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </form> */}

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

            {/* 
            <h3 className="text">User name:</h3>

            <ul>
              {Object.values(name).map((elem, index) => (
                <li className="text" key={index}>
                  {elem}
                </li>
              ))}
            </ul> */}
          </div>
        ) : (
          <div className="flex_block">
            <h1>Sign In</h1>
            <h2 className="text">Enter your mail and password</h2>

            <form
              className="flex_block"
              onSubmit={this.handleSubmit}
              autoComplete="off"
            >
              <label className="flex_block">
                Mail
                <input
                  type="text"
                  id="email"
                  placeholder="email"
                  onChange={this.handleChenge}
                />
              </label>

              <label className="flex_block">
                Password
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  onChange={this.handleChenge}
                />
              </label>

              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
