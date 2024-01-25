import React from 'react';
import { Form } from 'react-bootstrap';


function SelectTopics() {
  return (
    <Form>
      <Form.Select>
        <option value="      Semua Orang">
        Semua Orang
        </option>
        <option value="Menstruation">
        Menstruation
        </option>
        <option value="HIV/AIDS">
        HIV/AIDS
        </option>
        <option value="Teenage pregnancy">
        Teenage pregnancy
        </option>
        <option value="Sexual orientation">
        Sexual orientation
        </option>
        <option value="Contraception">
        Contraception
        </option>
        <option value="Child Sexual Abuse">
        Child Sexual Abuse
        </option>
        <option value="Pregnancy">
        Pregnancy
        </option>
        <option value="Sexual behaviour">
        Sexual behaviour
        </option>
      </Form.Select>
    </Form>
  );
}

export default SelectTopics;
