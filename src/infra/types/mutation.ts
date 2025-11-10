export interface MutationProps<T> {
  onSuccess?: (data?: T) => void;
  onError?: (error: Error) => void;
}
