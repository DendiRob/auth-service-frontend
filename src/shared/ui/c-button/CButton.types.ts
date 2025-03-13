import type { ButtonProps } from "primevue";

export type TCButtonProps = Partial<{
  label: string;
  uiProps: ButtonProps & { to?: string };
}>;
