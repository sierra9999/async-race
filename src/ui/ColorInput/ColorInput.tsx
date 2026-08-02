import styles from './ColorInput.module.css';

interface ColorInputProps {
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

function ColorInput({ value, onChange, disabled = false }: ColorInputProps) {
  return (
    <input
      type="color"
      className={styles.colorInput}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
    />
  );
}

export default ColorInput;
