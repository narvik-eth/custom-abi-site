import React, { useCallback, useState } from 'react';
import { Connect } from './Connect';

export const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(true);
  const openNavbarClass = openNavbar ? 'is-active' : '';
  const onClick = useCallback(() => {
    setOpenNavbar(!openNavbar);
  }, [openNavbar]);

  return (
    <nav aria-label="main navigation" className="navbar is-black">
      <div className="navbar-brand">
        <a className="navbar-item" href="/#">
          Custom ABI
        </a>
        <a
          aria-expanded="false"
          aria-label="menu"
          className={`navbar-burger burger ${openNavbarClass}`}
          data-target="navbar"
          role="button"
          onClick={onClick}
          href="#nav"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div className={`navbar-menu ${openNavbarClass}`} id="navbar">
        <div className="navbar-end">
          <Connect />
        </div>
      </div>
    </nav>
  );
};
