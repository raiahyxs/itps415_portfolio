import { useState } from 'react';
import Icon from './Icon';
const navigation = [['home', 'Home'], ['projects', 'Work'], ['skills', 'Expertise'], ['timeline', 'Journey']];
export default function Navbar({ fullName, theme, toggleTheme, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="container nav-inner" aria-label="Main navigation">
        <a href="#home" className="brand" aria-label={`${fullName} home`} onClick={() => setMenuOpen(false)}><span className="wordmark">rv<span>.</span></span><span className="brand-caption">{fullName.toUpperCase()}<br /><small>DESIGNER & DEVELOPER</small></span></a>
        <div className={`nav-links ${menuOpen ? 'menu-open' : ''}`} id="navigation-menu">
          {navigation.map(([id, label]) => <a href={`#${id}`} key={id} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Icon name="diagonal" size={16} /></a>
        </div>
        <div className="nav-actions"><button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button><a className="nav-contact" href="#contact">Let’s talk <Icon name="diagonal" size={16} /></a><button className="icon-button mobile-menu" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="navigation-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}><Icon name={menuOpen ? 'close' : 'menu'} /></button></div>
      </nav>
    </header>
  );
}
