import { style } from "@vanilla-extract/css";
import { vars } from "../../theme";

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  padding: '0.5rem 1rem 0.5rem 1rem',
  height: 60,
  zIndex: 2,
  backgroundColor: vars.colors.dark[8],
  color: vars.colors.snow[0],
})