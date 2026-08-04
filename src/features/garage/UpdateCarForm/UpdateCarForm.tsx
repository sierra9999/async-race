import type { SubmitEventHandler } from 'react';
import Button from '@/ui/Button/Button';
import validateCarName from '@/utils/validateCarName';
import { useUpdateCarMutation } from '@/api/garageApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEditForm } from '@/store/garageUiSlice';
import CarFields from '../CarFields/CarFields';
import styles from './UpdateCarForm.module.css';

function UpdateCarForm() {
  const dispatch = useAppDispatch();
  const { carId, name, color } = useAppSelector((state) => state.garageUi.editForm);
  const [updateCar, { isLoading }] = useUpdateCarMutation();
  const validation = validateCarName(name);
  const noSelection = carId === null;
  const submitDisabled = noSelection || !validation.valid || isLoading;
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (carId === null || submitDisabled) return;
    try {
      await updateCar({ id: carId, name: validation.trimmed, color }).unwrap();
    } catch {
      // Error state lives on the mutation, never log here.
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldset} disabled={noSelection}>
        <legend className={styles.legend}>Update</legend>
        <CarFields
          name={name}
          color={color}
          hint={noSelection ? '' : validation.error}
          onNameChange={(value) => dispatch(setEditForm({ name: value }))}
          onColorChange={(value) => dispatch(setEditForm({ color: value }))}
        />
        <Button variant="primary" type="submit" disabled={submitDisabled}>
          Update
        </Button>
      </fieldset>
    </form>
  );
}

export default UpdateCarForm;
