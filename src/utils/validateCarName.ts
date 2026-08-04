import { CAR_NAME_MAX_LENGTH } from '@/constants';

export interface CarNameValidation {
  valid: boolean;
  trimmed: string;
  error?: string;
}

function validateCarName(name: string): CarNameValidation {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { valid: false, trimmed, error: 'Name is required' };
  }
  if (trimmed.length > CAR_NAME_MAX_LENGTH) {
    return {
      valid: false,
      trimmed,
      error: `Name must be ${CAR_NAME_MAX_LENGTH} characters or fewer`,
    };
  }

  return { valid: true, trimmed };
}

export default validateCarName;
