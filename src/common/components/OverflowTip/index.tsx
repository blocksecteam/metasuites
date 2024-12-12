import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import styles from './index.module.less';

interface OverflowTipProps {
  className?: string;
  innerClassName?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
}

const OverflowTip: React.FC<OverflowTipProps> = ({
  className = '',
  innerClassName = '',
  title,
  children,
  ...restProps
}) => {
  const wrapperRef = useRef(null);
  const [isShowTip, setIsShowTip] = useState(false);


  useEffect(() => {
    const { current } = wrapperRef;
    if (current) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((item) => {
          const { intersectionRatio } = item;
          if (intersectionRatio < 1) {
            setIsShowTip(true);
          } else {
            setIsShowTip(false);
          }
        });
      });
      intersectionObserver.observe(current);
      return () => {
        intersectionObserver.unobserve(current);
      };
    }
    return undefined;
  }, []);

  const innerDom = (
    <div className={classNames('text-ellipsis', innerClassName, 'f-filter')}>
      {children}
      <span ref={wrapperRef} />
    </div>
  );
  return (
    <Tooltip
      className={classNames(styles.wrapper, className)}
      title={isShowTip ? title || children : undefined}
      {...restProps}
    >
      {innerDom}
    </Tooltip>
  );
};

Object.assign(OverflowTip, Tooltip);

export default OverflowTip as typeof Tooltip & React.FC<OverflowTipProps>;
