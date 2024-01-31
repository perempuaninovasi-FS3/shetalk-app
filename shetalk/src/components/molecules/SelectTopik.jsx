import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectTopics } from '../../redux/slice/topicSlice';


function SelectTopics() {

  const topics = useSelector(selectTopics);

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
