import React, { Component } from 'react';
import {connect} from 'react-redux';
import ChoresList from './ChoresList';
import {addChore} from '../actions/index';

import './Chores.css';

export class Chores extends Component {




  render() {
    const choreList = this.props.choreList.map((chores, index) =>

    <ChoresList {...chores} />

  );
    return (
      <div className="chore-box row section-border clear">
        <header className="chore-header">
          <div className="chores-title-div col-12-xs">
            <h3 className="chores-title">Chores</h3>
          </div>
        </header>
        <div className="chore-traking-table-div">
          <table>
            <tr>
              <th className="col-5">Date</th>
              <th className="col-5">Chore</th>
              <th className="col-5">Deposit/Withdrawl</th>
              <th className="col-5">Amount</th>
              <th className="col-5">Total</th>
            </tr>

            {choreList}

          </table>

          
        </div>
      </div>

    );
  }
}

 const mapStateToProps = state => ({
     choreList: state.choreList
 });

export default connect(mapStateToProps)(Chores);
