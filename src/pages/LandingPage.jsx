import React, { useState, useEffect } from "react";
import shetalk from "../assets/img/shetalk.svg";
import email from "../assets/img/fluent_mail-28-filled.svg";
import instagram from "../assets/img/ri_instagram-fill.svg";
import AvatarPick from "../components/molecules/AvatarPick";
import "../css/LandingPage.css";
import stiker01 from "../assets/img/sticker01.svg";
import shetalkDb from "../assets/img/shetalk-db.png";
import peopleava from "../assets/img/People-ava.svg";
import group108 from "../assets/img/Group108.svg";

function LandingPage() {
  useEffect(() => {
    // IntersectionObserver for elements with class .hiddenX
    const observerX = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    // Observe elements with class .hiddenX
    const hiddenElementsX = document.querySelectorAll(".hiddenX");
    hiddenElementsX.forEach((el) => observerX.observe(el));

    // IntersectionObserver for elements with class .hiddenY
    const observerY = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    // Observe elements with class .hiddenY
    const hiddenElementsY = document.querySelectorAll(".hiddenY");
    hiddenElementsY.forEach((el) => observerY.observe(el));

    // Cleanup function
    return () => {
      hiddenElementsX.forEach((el) => observerX.unobserve(el));
      hiddenElementsY.forEach((el) => observerY.unobserve(el));
    };
  }, []);
  return (
    <>
      {/* <!-- navbar --> */}
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={shetalk}
              alt="Logo"
              width="auto"
              height="24"
              className="d-inline-block align-text-top px-lg-4"
            />
          </a>
        </div>
      </nav>
      {/* <!-- start section 1 --> */}
      <div className="container-fluid costume-container ">
        <img
          src={stiker01}
          alt=""
          className="position-absolute img-fluid costume-img"
        />
        <div className="container ">
          <div className="row ">
            <div className="col-12 text-center mt-5 ">
              <h1 className="costume-text fw-bold hiddenY">
                Selamat datang di SheTalk!
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center text-white">
              <p>
                Platform yang didedikasikan untuk menyediakan ruang aman <br />{" "}
                dan terpercaya bagi perempuan untuk diskusi seputar <br />{" "}
                <span className="costume-text">
                  {" "}
                  kesehatan reproduksi dan seksual{" "}
                </span>
              </p>
            </div>
          </div>
          <div className="container">
            <div className="row position-relative mt-5">
              <div className="col-lg-9 mx-auto col-sm-4 costume-img-header">
                <img
                  src={shetalkDb}
                  alt="shetalk dashbord"
                  className="rounded-4 img-fluid shadow p-2 hiddenX"
                />
              </div>
              {/* <!-- untuk svg --> */}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- start card --> */}
      <div className="container text-center card-container">
        <div className="row">
          <div className="col-12 my-5 text-center">
            <h2 className="costume-text fw-bold ">Mengapa SheTalk?</h2>
            <p className="line"></p>
          </div>
        </div>
        <div className="row d-flex justify-content-center gap-4 cards ">
          <div className="col-lg-3 mt-lg-4 square hiddenX">
            <div className=" card mx-auto h-100 w-100 ">
              <div className=" card-body pt-4 ">
                <h5 className="costume-text  fs-6 fw-bold mb-4">
                  Anonim dan Aman
                </h5>
                <p className="card-text costume-p">
                  Privasimu adalah prioritas kami. Berdiskusi tanpa perlu
                  khawatir tentang identitas terungkap.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mt-lg-4 square hiddenX">
            <div className=" card mx-auto h-100 w-100 ">
              <div className=" card-body pt-4">
                <p className=" costume-text  fs-6 fw-bold   ">
                  Diskusi Terbuka dan Beragam
                </p>
                <p className="card-text costume-p">
                  Temukan solusi, bagikan pengalaman, dan berdialog secara
                  positif untuk membangun pengetahuan.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mt-lg-4 square hiddenX">
            <div className=" card mx-auto h-100 w-100">
              <div className=" card-body pt-4">
                <p className="costume-text  fs-6 fw-bold">Simpan Diskusi</p>
                <p className="card-text costume-p">
                  Memudahkan untuk mengakses informasi yang Anda butuhkan kapan
                  pun diperlukan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end card --> */}

      {/* <!-- start section 2 --> */}
      <div className="mt-5 mb-5">
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6 mt-5 hiddenY">
              <img src={peopleava} alt="avatar-profile" className="img-fluid" />
            </div>
            <div className="col-lg-6 text-center hiddenX">
              <p className="fs-5 costume-p-text text-end">
                Jadilah bagian dari SheTalk dan mulailah perjalanan kamu menuju
                pemahaman yang lebih baik tentang kesehatan reproduksi dan
                seksual.
                <br />
                <br />
                Bergabunglah sekarang untuk mendiskusikan, belajar, dan berbagi
                pengalaman. Mari kita jaga kesehatan reproduksi dan seksual kita
                bersama-sama!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end section 2 --> */}

      {/* <!-- start section 3 --> */}
      <div className="container hiddenX">
        <div className="costume-bot-bg d-flex justify-content-center align-items-center position-relative rounded-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center w-100 px-2 px-lg-5 ">
            <h1 className="text-white mb-5 mb-lg-0 fs-4">
              Nyaman di Ruang Aman
            </h1>
            <div className="text-center text-sm-left">
              <AvatarPick />
            </div>
            <img
              src={group108}
              alt=""
              className="position-absolute z-1 costume-img"
            />
          </div>
        </div>
      </div>
      {/* <!-- end section 3 --> */}

      {/* <!-- footer --> */}
      <div className="mt-5 container-fluid text-center">
        <div className=" d-lg-flex justify-content-lg-between mx-auto">
          <img
            src={shetalk}
            alt="Logo"
            width="auto"
            height="24"
            className="d-inline-block align-text-top px-lg-4 mb-3"
          />
          <p className="costume-p mb-3">shetalksinfo@shetalk.com</p>
          <div className="mb-3">
            <a href="tautan-email" className="text-decoration-none">
              <img src={email} alt="email" />
            </a>
            <a
              href="tautan-instagram"
              className="text-decoration-none"
              style={{ paddingLeft: "4px" }}
            >
              <img src={instagram} alt="instagram" />
            </a>
          </div>
        </div>
      </div>
      {/* <!-- end --> */}
    </>
  );
}

export default LandingPage;
