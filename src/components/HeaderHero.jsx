import { presentation } from '../data';
import Icon from './Icon';
export default function HeaderHero({ fullName, profile, user, projects, skills, analytics }) {
  return (
    <section id="home" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="status-dot" /> A CREATIVE MIND. A TECHNICAL EDGE.</div>
          <p className="hero-intro">Hello, I’m <strong className="hero-name">{fullName}.</strong></p>
          <h1>Designing<br />the <span className="future-word">future<svg viewBox="0 0 320 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 13Q155-6 317 10" /></svg></span>.<br />One pixel<br />at a time<span className="accent">.</span></h1>
          <p className="hero-bio">{profile.bio}</p>
          <div className="hero-buttons"><a href="#projects" className="button button-primary">Explore my work <Icon name="diagonal" size={18} /></a><a href="#contact" className="text-link">Let’s create something <Icon name="arrow" size={18} /></a></div>
          <div className="hero-location"><Icon name="pin" size={15} /><span>{presentation.location}</span><span className="location-divider" /><span>Thinking globally.</span></div>
        </div>
        <div className="hero-art">
          <div className="orbital-scene">
            <div className="orbit orbit-outer" aria-hidden="true"><span className="orbit-node" /></div><div className="orbit orbit-middle" aria-hidden="true" /><div className="orbit orbit-inner" aria-hidden="true" />
            <span className="scene-coordinate coordinate-top">CREATIVE SYSTEM / 01</span><span className="scene-cross cross-one" aria-hidden="true">+</span><span className="scene-cross cross-two" aria-hidden="true">+</span>
            <div className="portrait-frame"><img src={presentation.portrait} alt={fullName} fetchPriority="high" /><div className="portrait-gradient" /><span className="portrait-label">RV / PORTFOLIO</span></div>
            <div className="floating-card card-design"><span className="floating-icon"><Icon name="design" /></span><div><small>DESIGNED TO CONNECT</small><strong>Graphic Designer</strong></div><span className="mini-dot" /></div>
            <div className="floating-card card-code"><span className="floating-icon"><Icon name="code" /></span><div><small>BUILT TO PERFORM</small><strong>Web Developer</strong></div><Icon name="check" size={14} /></div>
            <div className="floating-card card-cloud"><span className="floating-icon"><Icon name="cloud" /></span><div><small>READY TO SCALE</small><strong>Cloud Engineer</strong></div></div>
            <span className="scene-coordinate coordinate-bottom">{user.created_at.slice(0, 4)} — ALWAYS EVOLVING</span>
          </div>
          <div className="art-caption"><span className="status-dot" /> At the intersection of creativity & technology.</div>
        </div>
      </div>
      <div className="container hero-bottom"><a className="scroll-cue" href="#projects"><span className="scroll-line" /> SCROLL TO EXPLORE</a><div className="hero-stats"><span><strong>{String(projects.length).padStart(2, '0')}</strong> Selected projects</span><span><strong>{String(skills.length).padStart(2, '0')}</strong> Creative disciplines</span><span title={`Static sample recorded ${analytics[0].visited_time.slice(0, 10)}`}><Icon name="eye" size={17} /><strong>{(analytics[0].viewers_count / 1000).toFixed(1)}k</strong> Profile views</span></div></div>
    </section>
  );
}
