import React from 'react';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import { dummyAvatar } from '../assets';
import PostCard from '../components/molecules/PostCard';

const Dashboard = () => {
  return (
    <>

      <Navbar />

      <div className="mx-md-3 ">
        <div className="row mx-4">
          {/* sidebar */}
          <div className="col-md-3 mb-5">
            <div className="position-fixed">
              <SideBar />
            </div>
          </div>

          {/* tempat Postingan */}
          <div className="col-md-9 mt-5  ">

            <PostCard avatar={dummyAvatar}
              nama="anonim"
              tanggal="12/01/2024"
              judul="Berapa lama menstruasi yang normal?"
              topik="menstruasi" />


            <PostCard
              avatar={dummyAvatar}
              nama="anonim"
              tanggal="12/01/2024"
              judul="Consent and Coercion: Examining Unwanted Sex Among Married Young Women in India"
              konten="K.G Santhya bersama empat orang rekannya pernah melakukan sebuah penelitian yang diberi judul “Consent and Coercion: Examining Unwanted Sex Among Married Young Women in India”. selengkapnya.."
              topik="menstruasi"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
