import Button from '@/ui/Button/Button';
import { DEFAULT_CAR_COLOR } from '@/constants';
import CarFields from '../CarFields/CarFields';
import styles from './UpdateCarForm.module.css';

function UpdateCarForm() {
  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <fieldset className={styles.fieldset} disabled>
        <legend className={styles.legend}>Update</legend>
        <CarFields
          name=""
          color={DEFAULT_CAR_COLOR}
          onNameChange={() => {}}
          onColorChange={() => {}}
        />
        <Button variant="primary" type="submit">
          Update
        </Button>
      </fieldset>
    </form>
  );
}

export default UpdateCarForm;
