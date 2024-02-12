import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { allTopics } from '../../redux/slice/topicSlice';
import { useNavigate, useLocation } from "react-router-dom";

function SelectTopics() {
  const topics = useSelector(allTopics);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const selectedTopicId = event.target.value;
    navigate(`/dashboard?topic=${selectedTopicId}`);
  };

  const isActive = (topicId) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('topic') === topicId;
  };

  return (
    <Form>
      <Form.Select onChange={handleChange}>
        {topics.map((topic) => (
          <option
            key={topic.id}
            value={topic.id}
            className={isActive(topic.id) ? 'active-menu' : ''}
          >
            {topic.name}
          </option>
        ))}
      </Form.Select>
    </Form>
  );
}

export default SelectTopics;
