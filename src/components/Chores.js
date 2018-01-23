import React, { Component } from 'react';
import {connect} from 'react-redux';
import ChoresList from './ChoresList';
import ChoreUpdate from './ChoreUpdate';
import {addChore} from '../actions/index';

import './Chores.css';

export class Chores extends Component {


//we want to take the data from the child input and add it as a new object to the state in the reducer

//take the old choreList array of objects and concat with the new object.


  addChore(choreDate, choreType, choreBanking, choreAmount) {
        this.props.dispatch(addChore(choreDate, choreType, choreBanking, choreAmount));
    }

  render() {
    const choreList = this.props.choreList.map((chores, index) =>
      <tbody key={index}>
        <ChoresList {...chores} />
      </tbody>
  );
    return (
      <div>
        <div className="chore-box row section-border clear">
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
                  {choreList}
            </table>
          </div>
        </div>
        <div className="chore-update">
          <ChoreUpdate addChore={this.addChore.bind(this)}/>
        </div>
      </div>

    );
  }

}

 const mapStateToProps = state => ({
     choreList: state.choreList
 });

export default connect(mapStateToProps)(Chores);
