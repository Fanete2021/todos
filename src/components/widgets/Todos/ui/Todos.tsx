import React, {KeyboardEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {Checkbox, Input} from '../../../UI';
import './Todos.css';
import {RxTextAlignBottom} from "react-icons/rx";
import {Todo} from "../model/todo";
import {selector} from "../model/selector";

const inputPlaceholder = "What needs to be done?";
const selectors = [selector.ALL, selector.ACTIVE, selector.COMPLETED]

const Todos = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [countNotCompletedTodos, setCountNotCompletedTodos] = useState<number>(0);
  const [currentSelector, setCurrentSelector] = useState<selector>(selector.ALL);

  const filterTodos = useMemo(() => {
    switch (currentSelector) {
      case selector.ALL:
        return todos;
      case selector.ACTIVE:
        return todos.filter((todo) => !todo.isComplete);
      case selector.COMPLETED:
        return todos.filter((todo) => todo.isComplete);
      default:
        return todos;
    }
  }, [todos, currentSelector])

  useEffect(() => {
    const count = todos.reduce((acc, todo) => {
      if (!todo.isComplete) {
        return acc + 1;
      }

      return acc;
    }, 0);

    setCountNotCompletedTodos(count);
    setFilteredTodos(filterTodos);
  }, [todos]);

  const onChangeTodo = useCallback((value: string) => {
    setTodo(value);
  }, []);

  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (todo) {
        setTodos([
          ...todos,
          { description: todo, isComplete: false }
        ]);

        setTodo("");
      }
    }
  };

  const changeComplete = (index: number, isComplete: boolean) => {
    todos[index].isComplete = isComplete;

    const changingCount = isComplete ? -1 : 1;
    setCountNotCompletedTodos(countNotCompletedTodos + changingCount);
  }

  useEffect(() => {
    setFilteredTodos(filterTodos);
  }, [currentSelector])

  const changeSelector = useCallback((sel: selector) => {
    setCurrentSelector(sel);
  }, [setCurrentSelector]);

  const clearCompletedTodos = () => {
    const notCompletedTodos = todos.filter((todo) => !todo.isComplete);
    setTodos(notCompletedTodos);
  }

  if (todos.length === 0) {
    return (
      <div
        className="Todos"
        data-testid="emptyTodos"
      >
        <div className="todos__input">
          <Input
            icon={RxTextAlignBottom}
            value={todo}
            onChange={onChangeTodo}
            placeholder={inputPlaceholder}
            onKeyDown={keyPressHandler}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className="Todos"
      data-testid="todos"
    >
      <div className="todos__input">
        <Input
          icon={RxTextAlignBottom}
          value={todo}
          onChange={onChangeTodo}
          placeholder={inputPlaceholder}
          onKeyDown={keyPressHandler}
        />
      </div>

      <div className="todos__checkboxes">
        {filteredTodos.map((todo, index) => (
          <div
            key={index}
            className="checkboxes__item"
          >
            <Checkbox
              label={todo.description}
              id={todo.description + index}
              onChange={() => changeComplete(index, !todo.isComplete)}
              checked={todo.isComplete}
            />
          </div>
        ))}
      </div>

      <div className="todos__footer">
        <div className="footer__info">
          <span
            data-testid="items-left"
            className="info__item"
          >
            {`${countNotCompletedTodos} items left`}
          </span>
        </div>

        <div className="footer__selectors">
          {selectors.map((sel) => (
            <div
              data-testid={sel}
              key={sel}
              className={`selectors__item ${sel === currentSelector ? "selectors__item-selected" : ""}`}
              onClick={() => changeSelector(sel)}
            >
              {sel}
            </div>
          ))}
        </div>

        <div className="footer__actions">
          <span
            data-testid="clear"
            onClick={clearCompletedTodos}
            className="actions__item"
          >
            Clear completed
          </span>
        </div>
      </div>

      <div className="todos__piece todos__piece-1" />
      <div className="todos__piece todos__piece-2" />
    </div>
  );
};

export default Todos;