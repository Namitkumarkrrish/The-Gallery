import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { animateNavEntrance } from "./navAnimation";
import Logout from "../Logout/Logout";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/our-gallery", label: "Gallery" },
  { to: "/add", label: "Add Moment" },
];

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const validLinks = linksRef.current.filter(Boolean);
    animateNavEntrance(navRef.current, logoRef.current, validLinks);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav} ref={navRef}>
      {/* Logo */}
      <div className={styles.logo} ref={logoRef}>
        <Link to="/" className={styles.logoLink}>
          <span className={styles.logoDot} aria-hidden="true" />
          Shivaa &amp; Krrish
        </Link>
      </div>

      {/* Hamburger */}
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </div>

      {/* Links */}
      <div className={`${styles.links} ${menuOpen ? styles.mobileOpen : ""}`}>
        {NAV_LINKS.map(({ to, label }, i) => (
          <Link
            key={to}
            to={to}
            className={`${styles.navLink} ${
              location.pathname === to ? styles.active : ""
            }`}
            ref={(el) => (linksRef.current[i] = el)}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}

        <div
          className={styles.divider}
          ref={(el) => (linksRef.current[NAV_LINKS.length] = el)}
        />

        <div
          className={styles.logoutWrapper}
          ref={(el) => (linksRef.current[NAV_LINKS.length + 1] = el)}
        >
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;