// src/features/garage/CreateCarForm/CreateCarForm.tsx
import { useState, type SubmitEventHandler } from 'react';
import Button from '@/ui/Button/Button';
import validateCarName from '@/utils/validateCarName';
import { useCreateCarMutation } from '@/api/garageApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCreateForm, resetCreateForm } from '@/store/garageUiSlice';
import CarFields from '../CarFields/CarFields';
import styles from './CreateCarForm.module.css';

function CreateCarForm() {
  const dispatch = useAppDispatch();
  const { name, color } = useAppSelector((state) => state.garageUi.createForm);
  const [createCar, { isLoading }] = useCreateCarMutation();
  const [touched, setTouched] = useState(false);
  const validation = validateCarName(name);
  const submitDisabled = !validation.valid || isLoading;
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setTouched(true);
    if (submitDisabled) return;
    try {
      await createCar({ name: validation.trimmed, color }).unwrap();
      dispatch(resetCreateForm());
      setTouched(false);
    } catch {
      // Error state lives on the mutation; never log here.
    }
  };
  const handleNameChange = (value: string) => {
    setTouched(true);
    dispatch(setCreateForm({ name: value }));
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Create</legend>
        <CarFields
          name={name}
          color={color}
          hint={touched ? validation.error : ''}
          onNameChange={handleNameChange}
          onColorChange={(value) => dispatch(setCreateForm({ color: value }))}
        />
        <Button variant="primary" type="submit" disabled={submitDisabled}>
          Create
        </Button>
      </fieldset>
    </form>
  );
}

export default CreateCarForm;
