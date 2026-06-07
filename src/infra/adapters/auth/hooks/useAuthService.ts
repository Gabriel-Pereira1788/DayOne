import { useDI } from '@/infra/DI/context';
import { DIKeys } from '@/infra/DI/types';

export function useAuthService() {
  return useDI(DIKeys.AuthService);
}
