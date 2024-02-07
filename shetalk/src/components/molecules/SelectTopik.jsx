import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { allTopics } from '../../redux/slice/topicSlice';


function SelectTopics() {

  const topics = useSelector(allTopics);

  return (
    <Form>
      <Form.Select>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.slug}>
            {topic.name}
          </option>
        ))}
      </Form.Select>
    </Form>
  );
}

export default SelectTopics;
