import React, {InputHTMLAttributes, memo} from 'react';
import './Checkbox.css';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

interface CheckboxProps extends HTMLInputProps {
  label: string;
  checked?: boolean;
  id: string;
  onChange?: () => void;
}

const Checkbox = memo((props: CheckboxProps) => {
  const {
    label,
    id,
    onChange,
    checked,
    ...otherProps
  } = props;

  return (
    <label>
      <input
        data-testid={`checkbox-${label}`}
        type="checkbox"
        className="checkbox__input"
        id={id}
        checked={checked}
        onChange={onChange}
        {...otherProps}
      />

      <label
        data-testid="checkbox-label"
        htmlFor={id}
        className="checkbox__label"
      >
        {label}
      </label>
    </label>
  );
});

export default Checkbox;