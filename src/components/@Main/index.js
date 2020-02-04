import React from 'react';
import { Redirect } from 'react-router';
import QrReader from 'react-qr-reader';
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';

import { ROUTE_LOGIN } from '../../utils/constans';

import {check} from '../../api/checkin';

const defaultAttendee = {
  attendeeName: '-',
  attendeeEmail: '-',
  event: '-',
  pax: 0,
  paxCheckedIn: 0,
}

class Main extends React.Component {
  state = {
    attendee: {},
    result: 'No result',
    isModalOpen: false
  };

  componentDidMount () {
    let currentState = {...this.state};
    currentState.attendee = Object.assign({}, defaultAttendee);
    this.setState(currentState);
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      });
    }
  };

  handleError = () => {
    this.setState({
      result: 'Try Again.'
    });
  };

  handleCheck = () => {
    const {result} = this.state;
    if (result === 'No result' || result === 'Try Again.') return;
    check(this.state.result).then((res) =>{
      this.handleOpen();
      console.log({res});
    }).catch(err => {
      alert(err.response.data.detail)
      console.log({err})
    })
  }

  handleOpen = () => {
    this.setState({isModalOpen: true});
  };

  handleClose = () => {
    this.setState({isModalOpen: false});
  };

  handleResetResult = () => {
    this.setState({result: 'No result'});
  }

  render() {
    const { getToken, setToken } = this.props;
    const { isModalOpen, attendee } = this.state;
    return getToken() ? (
      <div className="App">
        <div className="App-header">
          <Link
            href="#"
            onClick={() => {
              setToken('');
            }}
            variant="body2"
          >
            Logout
          </Link>
          <div>
            <QrReader
              delay={300}
              showViewFinder={false}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%', maxWidth: '500px' }}
            />
            <p style={{ color: 'black' }}>{this.state.result}</p>
            <button className="button" onClick={() => this.handleResetResult()} >Reset</button>
            <button className="button" onClick={() => this.handleCheck()} >Send</button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={isModalOpen}
              onClose={this.handleClose}
            >
              <div className='modal'>
                <h2 id="simple-modal-title">{`${attendee.attendeeName} - ${attendee.attendeeEmail}`}</h2>
                <p id="simple-modal-description">
                  {`${attendee.event} - Pax : ${attendee.pax}`}
                </p>
                <p id="simple-modal-description">
                  {`Pax Check In : ${attendee.paxCheckedIn}`}
                </p>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to={ROUTE_LOGIN} />
    );
  }
}

export default Main;
