import React from 'react';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import { dummyAvatar } from '../assets';
import PostCard from '../components/molecules/PostCard';



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

          <div className="col-9 mt-5 ">
            {/* tempat Postingan */}

            <PostCard img={dummyAvatar} 
            nama="anonim" 
            tanggal="12/01/2024" 
            judul="Berapa lama menstruasi yang normal?" 
            topik="menstruasi"
         />


            <PostCard
              img={dummyAvatar}
              nama="anonim"
              tanggal="12/01/2024"
              judul="Consent and Coercion: Examining Unwanted Sex Among Married Young Women in India"
              konten="K.G Santhya bersama empat orang rekannya pernah melakukan sebuah penelitian yang diberi judul “Consent and Coercion: Examining Unwanted Sex Among Married Young Women in India”. Penelitian tersebut menggunakan metode survey dan wawancara mendalam yang melibatkan 1.664 wanita muda yang selengkapnya."
              topik="menstruasi"
            />

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
