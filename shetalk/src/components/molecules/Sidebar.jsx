import React from 'react';
import ModalPost from './ModalPost';
import Menu from '../atoms/Menu';
import { IconBeranda, IconJawabPertanyaan, IconTersimpan } from '../../assets';
import SelectTopics from './SelectTopik';
import NavMobile from '../atoms/NavMobile';
import { Link } from 'react-router-dom';
import TopicMenu from './TopicMenu';

const SideBar = () => {

  return (
    <>
      <div className="d-flex justify-content-md-start   justify-content-center gap-2   ">
        <div>
          <ModalPost />
        </div>
        <div className="d-block d-md-none">
          <SelectTopics />
        </div>
      </div>
      <div className='mt-2 '>
        <NavMobile />
      </div>

      {/* untuk layar desktop */}
      <div className="d-flex flex-md-column  d-none d-md-block  ">
        <Link to={'/dashboard'} style={{ textDecoration: 'none' }}><Menu img={IconBeranda} title="Beranda" /></Link>
        <Link to={'/dashboard'} style={{ textDecoration: 'none' }}><Menu img={IconJawabPertanyaan} title="Jawab Pertanyaan" /></Link>
        <Link to={'/dashboard'} style={{ textDecoration: 'none' }}><Menu img={IconTersimpan} title="Tersimpan" /></Link>
      </div>

      <div className='d-none d-md-block mt-5 '>
        <TopicMenu />
      </div>
    </>
  );
};

export default SideBar;
