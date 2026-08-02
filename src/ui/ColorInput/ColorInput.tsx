import type { ChangeEventHandler } from 'react';
import styles from './ColorInput.module.css';

interface ColorInputProps {
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

function ColorInput({ value, onChange, disabled = false }: ColorInputProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="color"
      className={styles.colorInput}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

export default ColorInput;
