import React, { useState } from 'react';
import ModalPost from './ModalPost';
import Menu from '../atoms/Menu';
import { IconBeranda, IconJawabPertanyaan, IconTersimpan } from '../../assets';
import SelectTopics from './SelectTopik';
import NavMobile from '../atoms/NavMobile';
import { NavLink, useLocation } from 'react-router-dom';
import TopicMenu from './TopicMenu';

const SideBar = () => {

  const location = useLocation();
  const [topicSelected, setTopicSelected] = useState(false);

  const isActive = (filter) => {
    const urlParams = new URLSearchParams(location.search);
    const currentFilter = urlParams.get('filter');

    if (!filter) {
      return !currentFilter;
    }

    return currentFilter === filter;
  };

  return (
    <>
      <div className="d-flex justify-content-md-start justify-content-center gap-2">
        <div>
          <ModalPost />
        </div>
        <div className="d-block d-md-none">
          <SelectTopics />
        </div>
      </div>
      <div className='mt-2'>
        <NavMobile />
      </div>

      {/* untuk layar desktop */}
      <div className="d-flex flex-md-column d-none d-md-block">
        <NavLink to={'/dashboard'} className={(isActive(null) && !topicSelected) ? 'active-menu' : ''} style={{ textDecoration: 'none' }}><Menu img={IconBeranda} title="Beranda" /></NavLink>
        <NavLink to={'/dashboard?filter=jawab-pertanyaan'} className={isActive('jawab-pertanyaan') ? 'active-menu' : ''} style={{ textDecoration: 'none' }}><Menu img={IconJawabPertanyaan} title="Jawab Pertanyaan" /></NavLink>
        <NavLink to={'/dashboard?filter=informasi'} className={isActive('informasi') ? 'active-menu' : ''} style={{ textDecoration: 'none' }}><Menu img={IconTersimpan} title="Informasi" /></NavLink>
      </div>

      <div className='d-none d-md-block mt-4'>
        <TopicMenu setTopicSelected={setTopicSelected} />
      </div>
    </>
  );
};

export default SideBar;
