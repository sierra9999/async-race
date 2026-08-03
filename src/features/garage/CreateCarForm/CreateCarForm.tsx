import Button from '@/ui/Button/Button';
import { DEFAULT_CAR_COLOR } from '@/constants';
import CarFields from '../CarFields/CarFields';
import styles from './CreateCarForm.module.css';

function CreateCarForm() {
  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Create</legend>
        <CarFields
          name=""
          color={DEFAULT_CAR_COLOR}
          onNameChange={() => {}}
          onColorChange={() => {}}
        />
        <Button variant="primary" type="submit">
          Create
        </Button>
      </fieldset>
    </form>
  );
}

export default CreateCarForm;
