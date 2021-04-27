import React from "react";
import firebase from "firebase/app";

class Auth extends React.Component {
  state = {
    email: "",
    password: "",
  };

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
      // .then((response) => alert(`Success ${this.state.email}!`, response))
      .then(() => {
        this.props.hasAccount();
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
  };
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default Auth;
