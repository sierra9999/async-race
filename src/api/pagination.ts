import type { PagedResult } from './types';

interface ResponseMeta {
  response?: { headers: Headers };
}

export function withPageTotal<T>(items: T[], meta: ResponseMeta | undefined): PagedResult<T> {
  return {
    items,
    total: Number(meta?.response?.headers.get('X-Total-Count') ?? 0),
  };
}
export default withPageTotal;
