import type { FC } from 'react';

import './styles.css';

export type RGBProps = JSX.IntrinsicElements['div'] & {
  color: string;
};

export const RGB: FC<RGBProps> = ({ color, className, ...rest }) => (
  <span {...rest} className={['rgb', className].filter(Boolean).join(' ')}>
    <i className='rgb__icon' style={{ backgroundColor: color }}/>
    {color}
  </span>
);
