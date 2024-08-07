import { JSX } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";

export type GmButtonVariants = 'link' | 'ghost' | 'normal';

export type GmButtonColors = 'primary' | 'secondary' | 'danger' | 'success';

// label or children is required
export interface GmButtonProps {
  onClick?: (e: MouseEvent & {
    currentTarget: HTMLButtonElement;
    target: DOMElement;
  }) => void;
  variant?: GmButtonVariants;
  color?: GmButtonColors;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  children?: JSX.Element;
};
