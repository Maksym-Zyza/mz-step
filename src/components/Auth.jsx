import React from "react";
import firebase from "firebase/app";
import Loader from "./Loader";

class Auth extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
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
      .then(this.setState({ isLoading: true }))
      // .then((response) => alert(`Success ${this.state.email}!`, response))
      .then(() => {
        this.props.hasAccount();
      })
      .catch((error) => {
        alert(error.message);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <>
        <div className="flex_block">
          <h1>Увійти</h1>
          <h2 className="text">Введіть свою пошту та пароль</h2>

          <form
            className="flex_block"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <label className="flex_block">
              Пошта
              <input
                type="text"
                id="email"
                placeholder="email"
                onChange={this.handleChenge}
              />
            </label>

            <label className="flex_block">
              Пароль
              <input
                type="password"
                id="password"
                placeholder="password"
                onChange={this.handleChenge}
              />
            </label>

            <button className="btn" type="submit">
              Надіслати
            </button>
          </form>
        </div>

        {isLoading && <Loader isLoading={isLoading} />}
      </>
    );
  }
}

export default Auth;
