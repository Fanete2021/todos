import React, {useCallback, useState} from 'react';
import { Input } from '../../UI';
import './Todos.css';
import {RxTextAlignBottom} from "react-icons/rx";

const inputPlaceholder = "What needs to be done?";

const Todos = () => {
  const [todo, setTodo] = useState<string>("");

  const onChange = useCallback((value: string) => {
    setTodo(value);
  }, [])

  return (
    <div
      className="Todos"
    >
      <div
        className="todos__input"
      >
        <Input
          icon={RxTextAlignBottom}
          value={todo}
          onChange={onChange}
          placeholder={inputPlaceholder}
        />
      </div>

      <div
        className="todos__checkboxes"
      >

      </div>

      <div
        className="todos__footer"
      >
        <div
          className="footer__info"
        >

        </div>

        <div
          className="footer__selectors"
        >

        </div>

        <div
          className="footer__actions"
        >

        </div>
      </div>
    </div>
  );
};

export default Todos;