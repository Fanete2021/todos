import React, {ChangeEvent, InputHTMLAttributes, memo, useCallback} from 'react';
import './Input.css';
import {IconType} from "react-icons";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface InputProps extends HTMLInputProps {
  onChange?: (value: string) => void;
  icon?: IconType;
}

const Input = memo((props: InputProps) => {
  const {
    value,
    onChange,
    placeholder,
    icon,
    ...otherProps
  } = props;

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  return (
    <div
      className="wrapper"
    >
      {icon &&
        <div
          className="wrapper__icon"
        >
          {React.createElement(icon, {size: '20px'})}
        </div>
      }

      <input
        data-testid="input"
        className="wrapper__input"
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  )
});



export default Input;