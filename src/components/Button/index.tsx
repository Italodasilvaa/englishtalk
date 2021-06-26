import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};


// props:ButtonProps
export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    // <button>{props.children}</button>
    <button
      className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  )
}

