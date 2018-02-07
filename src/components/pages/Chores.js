import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addChore, fetchChores} from '../../actions/index';

import ChoresList from './ChoresList';
import ChoreUpdate from './ChoreUpdate';

import '../Chores.css';

class Chores extends Component {

  componentDidMount() {
        this.props.dispatch(fetchChores());
    }

  addChore(choreDate, choreType, choreBanking, choreAmount, choreTotal) {
        this.props.dispatch(addChore(choreDate, choreType, choreBanking, choreAmount, choreTotal));
    }

  render() {
    const list = this.props.choreList.map((chores, index) =>
      <tbody key={index}>
        <ChoresList {...chores} />
      </tbody>
  );

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
          <ChoreUpdate addChore={this.addChore.bind(this)}/>
        </div>
    </div>

    );
  }

}

 const mapStateToProps = state => ({
     choreList: state.addChoreReducer.choreList
 });

export default connect(mapStateToProps)(Chores);
