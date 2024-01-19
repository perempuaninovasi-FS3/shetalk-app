import React from 'react';
import ModalComponent from './ModalComponent';
import Menu from '../atoms/Menu';
import { IconBeranda, IconJawabPertanyaan } from '../../assets';
import Topics from '../atoms/Topics';


const SideBar = () => {
  return (
    <>
      <div>
        <ModalComponent />
      </div>
      <div className="mb-4 mt-2">
        <Menu img={IconBeranda} title="Beranda" />
        <Menu img={IconJawabPertanyaan} title="Jawab Pertanyaan" />
      </div>

      <div>
        <h2 className="fs-5 mb-4">Topics</h2>
        <Topics fillColor="#FF6565" title="Menstruation" />
        <Topics fillColor="#FC65FF" title="HIV/AIDS" />
        <Topics fillColor="#6865FF" title="Teenage pregnancy" />
        <Topics fillColor="#FCFF65" title="Sexual orientation" />
        <Topics fillColor="#68FF65" title="Contraception" />
        <Topics fillColor="#65C8FF" title="Child Sexual Abuse" />
        <Topics fillColor="#FFC165" title="Pregnancy" />
        <Topics fillColor="#7597D6" title="Sexual behaviour" />
      </div>
    </>
  );
};

export default SideBar;
