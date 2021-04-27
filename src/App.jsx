import React from "react";
import firebase from "firebase/app";
import Authorisetion from "./components/Auth";
import Lots from "./components/Lots";
import Loader from "./components/Loader";

export default class App extends React.Component {
  state = {
    account: false,
    lots: {},
    isLoading: false,
  };

  componentDidMount() {
    const db = firebase.database();
    this.setState({ isLoading: true });

    const lots = db.ref("lots");
    lots.on("value", (elem) => {
      this.setState({ lots: elem.val() });
      console.log(this.state.lots);
      this.setState({ isLoading: false });
    });
  }

  hasAccount = () => {
    this.setState({ account: true });
  };

  render() {
    const { account, lots, isLoading } = this.state;

    return (
      <div>
        {/* Get Lots */}
        {account && <Lots lots={lots} />}

        {/* Authorisetion */}
        {!account && <Authorisetion hasAccount={this.hasAccount} />}

        {isLoading && <Loader isLoading={isLoading} />}
      </div>
    );
  }
}
