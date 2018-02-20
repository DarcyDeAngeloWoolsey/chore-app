import React, { Component } from "react";
import { connect } from "react-redux";
import { addEntry, fetchEntries } from "../../actions/entryActions";

import ChoresList from "./ChoresList";
import ChoreUpdate from "./ChoreUpdate";

import "../Chores.css";

class Chores extends Component {
  componentDidMount() {
    console.log("fetch Chores component did mount!")
    this.props.dispatch(fetchEntries());

  }

  addEntry(choreDate, choreType, choreBanking, choreAmount, choreTotal) {
    this.props.dispatch(
      addEntry(choreDate, choreType, choreBanking, choreAmount, choreTotal)
    );
  }

  render() {
    let choreTotal = 0;
    const list = this.props.balanceBook.map((chores, index) => {
      choreTotal = choreTotal + chores.choreAmount;
      return (
        <tbody key={index}>
          <ChoresList {...chores} choreTotal={choreTotal} />
        </tbody>
      )
    });

    return (
      <div>
        <div className="chore-box box row section-border clear">
          <header className="chore-header">
            <div className="chores-title-div col-12-xs">
              <h3 className="chores-title">Chores</h3>
            </div>
          </header>
          <div className="chore-traking-table-div">
            <table>
              <tbody>
                <tr>
                  <th className="col-5">Date</th>
                  <th className="col-5">Chore</th>
                  <th className="col-5">Deposit/Withdrawl</th>
                  <th className="col-5">Amount</th>
                  <th className="col-5">Total</th>
                </tr>
              </tbody>
              {list}
            </table>
          </div>
        </div>
        <div className="chore-update">
          <ChoreUpdate addEntry={this.addEntry.bind(this)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  balanceBook: state.addEntryReducer.balanceBook
});

export default connect(mapStateToProps)(Chores);
