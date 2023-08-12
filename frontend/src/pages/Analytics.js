import React from 'react';

const Analytics = () => {
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
                  <input type="date" />
                </div>
                <div className="input-box">
                  <div className="details">End date</div>
                  <input type="date" />
                </div>
              </div>
              <button className="btn"
                style={{ backgroundColor: "#222E3C", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", float: "left" }}
                title='Generate'>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;