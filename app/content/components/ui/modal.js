import React, { useEffect } from 'react';

import ReactDOM from 'react-dom';

export default React.memo(({ onShow = () => {}, showModal, ...props }) => {

  useEffect(() => {
    if (showModal) {
      const scrollingEl = window.document.documentElement;
      const scrollTop = scrollingEl.scrollTop;

      scrollingEl.style.overflow = 'hidden';

      onShow();

      return () => {
        scrollingEl.style.overflow = '';

        scrollingEl.scrollTop = scrollTop;
      };
    }
  }, [onShow, showModal]);

  return !showModal
    ? null
    : ReactDOM.createPortal(<Modal {...props} />, window.document.getElementById('modal'));
});

function Modal({ children, className }) {
  return (
    <div className={className}>
      <section onClick={e => e.stopPropagation()}>{children}</section>
    </div>
  );
}
