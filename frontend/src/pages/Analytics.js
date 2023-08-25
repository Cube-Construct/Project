import { React, useState } from 'react';
import axios from 'axios';


const Analytics = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const [dates, setDates] = useState({
    startDate: '',
    endDate: ''
  });

  const DownloadREPORT = async () => {
    try {
      const res = await axios.post('http://localhost:5000/verification/report', dates,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

      if (res.data.status === 'success') {
        window.open(`http://localhost:5000/reports/${res.data.fileName}`, '_blank');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      <div className='main-body' style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="title">Report</div>
          <div className="content">
            <div className='div-form'>
              <div className="user-details">
                <div className="input-box">
                  <div className="details">Start date</div>
                  <input type="date" onChange={e => setDates({ ...dates, startDate: e.target.value })} />
                </div>
                <div className="input-box">
                  <div className="details">End date</div>
                  <input type="date" onChange={e => setDates({ ...dates, endDate: e.target.value })} />
                </div>
              </div>
              <button className="btn"
                style={{ backgroundColor: "#222E3C", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", float: "left" }}
                title='Generate'
                onClick={() => DownloadREPORT()} >
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;