import ColorInput from '@/ui/ColorInput/ColorInput';
import styles from './CarFields.module.css';

interface CarFieldsProps {
  name: string;
  color: string;
  hint?: string;
  onNameChange: (name: string) => void;
  onColorChange: (color: string) => void;
}

function CarFields({ name, color, hint = '', onNameChange, onColorChange }: CarFieldsProps) {
  return (
    <>
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Car name"
          className={styles.nameInput}
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
        />
        {hint ? <span className={styles.hint}>{hint}</span> : null}
      </div>
      <ColorInput value={color} onChange={onColorChange} />
    </>
  );
}

export default CarFields;
