import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyAvatar } from '../assets';
import PostCard from '../components/molecules/PostCard';
import Comment from '../components/atoms/Comment';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';


const DetailPost = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <div className="sticky-top">
          <Navbar />
        </div>
        <div className="container">
          <div className='content-dashboard'>
            <div className="row flex justify-content-between">
              <div className="col-md-3 mb-3 sidebar-desktop">
                <SideBar />
              </div>
              <div className="col-md-9 post-desktop">
                <div className="p-3 mx-md-5">
                  {/* tombol kembali ke beranda */}
                  <div className="mb-4">
                    <a href="#" onClick={() => navigate('/dashboard')}>
                      <svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <title>ionicons-v5-a</title>
                        <polyline points="244 400 100 256 244 112" fill="none" stroke="#43D7C2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={48} />
                        <line x1="120" y1="256" x2="412" y2="256" fill="none" stroke="#43D7C2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={48} />
                      </svg>
                    </a>
                  </div>

                  {/* isi detail post */}
                  <PostCard
                    avatar={dummyAvatar}
                    nama="anonim"
                    tanggal="12/01/2024"
                    judul="Pernahkah Anda dipaksa atau ditekan untuk berhubungan seks?"
                    konten="K.G Santhya bersama empat orang rekannya pernah melakukan sebuah penelitian yang diberi judul “Consent and Coercion: Examining Unwanted Sex Among Married Young Women in India”. Penelitian tersebut menggunakan metode survey dan wawancara mendalam yang melibatkan 1.664 wanita muda yang sudah menikah di Gujarat dan Benggala Barat India. Ternyata, ditemukan hasil bahwa sebanyak 12 persen wanita yang sudah menikah sering melakukan hubungan intim yang tidak diinginkan, sedangkan 32 persen mengalami kondisi tersebut sesekali.
                            Kebanyakan hubungan seks yang tidak diinginkan tersebut dilatarbelakangi oleh kondisi pasangan yang belum memiliki anak, pendidikan yang rendah, dan adanya norma yang membenarkan pemukulan istri.
                            Selain itu, berdasarkan wawancara mendalam yang dilakukan oleh Santhya dan kawan-kawannya terhadap 69 wanita, juga ditemukan hasil bahwa para perempuan tersebut memilih untuk tidak melakukan hubungan intim saat mereka sedang tidak menginginkannya. Sebanyak 4 dari 5 respondennya memilih untuk berkata tidak ke sang suami ketika mereka tidak ingin berhubungan intim."
                    // showComment bernilai default true ketika di detail post
                    showComment={true}
                  />

                  {/* komentar */}
                  <p className="p-3">komentar</p>
                  <Comment avatar={dummyAvatar} nama="anonim" time="10 menit yang lalu" textComment="Normalnya 7 hari" />
                  <Comment avatar={dummyAvatar} nama="anonim" time="15 menit yang lalu" textComment="3 hari mungkin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPost;
