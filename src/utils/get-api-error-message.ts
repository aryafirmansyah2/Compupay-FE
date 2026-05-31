export function getApiErrorMessage(
  error: any,
  fallback = "Something went wrong",
) {
  return (
    error?.response?.data?.errors?.message ||
    error?.response?.data?.message ||
    error?.response?.data?.errors ||
    error?.message ||
    fallback
  );
}
