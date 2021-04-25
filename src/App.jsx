import React from "react";
import firebase from "firebase/app";

export default class App extends React.Component {
  state = {
    email: "",
    password: "",
    hasAccount: false,
  };

  componentDidMount() {
    const db = firebase.database();
    console.log(db);
  }

  handleChenge = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  createAccount = () => {
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
      .then((response) => console.log(`Hello ${this.state.email}!`, response))
      .then(this.setState({ hasAccount: true }))
      .catch((error) => console.log(error.message));
  };

  render() {
    const { email, hasAccount } = this.state;

    return (
      <div>
        {hasAccount ? (
          <h1 className="message">Hello, {email} </h1>
        ) : (
          <div className="login_block">
            <h1 className="message">Please sign In</h1>
            <input
              type="text"
              id="email"
              placeholder="email"
              onChange={this.handleChenge}
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={this.handleChenge}
            />
            <input type="submit" onClick={this.createAccount} />
          </div>
        )}
      </div>
    );
  }
}
