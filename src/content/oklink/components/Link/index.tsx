import { memo} from 'react';
import type { FC } from 'react';
import classNames from 'classnames'
import styles from './index.module.less';


interface Props {
  href: string;
  className?: string;
  isBlack?: boolean;
  children: React.ReactNode;
}


const Link: FC<Props> = ({ href, isBlack = false, className, children }) => {
  return (
    <a
      className={classNames(styles.link, 'f-filter', isBlack && styles.black, className)}
      href={href}
      target="_blank"
    >
      {children}
    </a>
  )
}

export default memo(Link)
