import type { FC, JSX } from 'react';

import styles from './RGB.module.css';

export type RGBProps = JSX.IntrinsicElements['div'] & {
  color: string;
};

export const RGB: FC<RGBProps> = ({ color, className, ...rest }) => (
  <span {...rest} className={[styles.root, className].filter(Boolean).join(' ')}>
    <i className={styles.icon} style={{ backgroundColor: color }} />
    {color}
  </span>
);
