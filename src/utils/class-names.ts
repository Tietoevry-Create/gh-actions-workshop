export function classNames(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}
