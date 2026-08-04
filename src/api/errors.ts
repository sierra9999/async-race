import { HTTP_NOT_FOUND } from '@/constants';

export function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as { status: unknown }).status === HTTP_NOT_FOUND
  );
}

export default isNotFoundError;
