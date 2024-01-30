import React from 'react';
import { useSelector } from 'react-redux';
import ModalComponent from './ModalComponent';
import Menu from '../atoms/Menu';
import { IconBeranda, IconJawabPertanyaan, IconTersimpan } from '../../assets';
import Topics from '../atoms/Topics';
import SelectTopics from './SelectTopik';
import NavMobile from '../atoms/NavMobile';
import { Link } from 'react-router-dom';
import { selectTopics } from '../../redux/slice/topicSlice';

const SideBar = () => {

  const topics = useSelector(selectTopics);

  const topicColors = ["#FF6565", "#FC65FF", "#6865FF", "#FCFF65", "#68FF65", "#65C8FF", "#FFC165", "#7597D6"];
  const getTopicColor = (index) => {
    return topicColors[index % topicColors.length];
  };

  return (
    <>
      <div className="d-flex justify-content-md-start   justify-content-center gap-2   ">
        <div>
          <ModalComponent />
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
        <h2 className="fs-5 mb-4">Topics</h2>
        {topics
          .filter((topic) => topic.id !== '1') // Filter topik dengan id '1'
          .map((topic, index) => (
            <Topics key={topic.slug} fillColor={getTopicColor(index)} title={topic.name} />
          ))}
      </div>
    </>
  );
};

export default SideBar;
