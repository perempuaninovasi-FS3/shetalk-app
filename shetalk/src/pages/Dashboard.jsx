import React from 'react';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="mx-5 ">
        <div className="row mx-5">
          <div className="col-3 ">
            <div className="position-fixed">
              <SideBar />
            </div>
          </div>

          <div className="col-9 mt-5 ">{/* tempat Postingan */}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
