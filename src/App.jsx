import React from "react";
import firebase from "firebase/app";
import Authorisetion from "./components/Auth";
import Lots from "./components/Lots";
import scrollTo from "./components/scrollTo";

export default class App extends React.Component {
  state = {
    account: false,
    lots: [],
  };

  componentDidMount() {
    const db = firebase.database();

    const lots = db.ref("lots");
    lots.on("value", (elem) => {
      this.setState({ lots: elem.val() });
      console.log(this.state.lots);
    });
  }

  hasAccount = () => {
    this.setState({ account: true });
  };

  render() {
    const { account, lots } = this.state;

    return (
      <div>
        {/* Get Lots */}
        {account && <Lots lots={lots} scroll={scrollTo()} />}

        {/* Authorisetion */}
        {!account && <Authorisetion hasAccount={this.hasAccount} />}
      </div>
    );
  }
}
