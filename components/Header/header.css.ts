import { style } from "@vanilla-extract/css";
import { useMantineTheme } from "@mantine/core";

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  padding: '0.5rem 1rem 0.5rem 1rem',
  height: 48,
  zIndex: 2,
  borderBottom: `1px solid`,
})