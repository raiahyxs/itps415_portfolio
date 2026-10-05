import { useEffect, useRef, useState } from 'react';
import { getPortfolio, portfolioDB } from './data';
import Navbar from './components/Navbar';
import HeaderHero from './components/HeaderHero';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Icon from './components/Icon';
import useLocalState from './hooks/useLocalState';
const portfolio = getPortfolio();
function initialTheme() {
  try { const stored = localStorage.getItem('rv-theme'); if (stored === 'light' || stored === 'dark') return stored; } catch { /* Default theme. */ }
  return 'dark';
}
export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [activeSection, setActiveSection] = useState('home');
  const [endorsements, setEndorsements] = useLocalState('rv-endorsements-v1', [], (rows) => Array.isArray(rows) && rows.every((row) => row && portfolio.skills.some((skill) => skill.skill_id === row.skill_id) && row.endorser_user_id === 2) && new Set(rows.map((row) => row.skill_id)).size === rows.length);
  const [comments, setComments] = useLocalState('rv-comments-v1', [], (rows) => Array.isArray(rows) && rows.every((row) => row && portfolio.projects.some((project) => project.project_id === row.project_id) && row.user_id === 2 && typeof row.comment_text === 'string'));
  const appRef = useRef(null);
  useEffect(() => {
    document.title = `${portfolio.fullName} — Design. Develop. Deploy.`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', `${portfolio.fullName} — graphic designer, web developer, and cloud engineer. A portfolio at the intersection of creativity and technology.`);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('rv-theme', theme); } catch { /* Theme works without persistence. */ }
  }, [theme]);
  useEffect(() => {
    if (!appRef.current || !('IntersectionObserver' in window)) return;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    appRef.current.querySelectorAll('.reveal').forEach((element) => { element.classList.add('will-reveal'); revealObserver.observe(element); });
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-20% 0px -55% 0px' });
    appRef.current.querySelectorAll('section[id]').forEach((section) => sectionObserver.observe(section));
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);
  function toggleEndorsement(skillId) {
    setEndorsements((rows) => rows.some((row) => row.skill_id === skillId) ? rows.filter((row) => row.skill_id !== skillId) : [...rows, { endorsement_id: Math.max(0, ...portfolioDB.Skill_Endorsement.map((row) => row.endorsement_id), ...rows.map((row) => row.endorsement_id)) + 1, skill_id: skillId, endorser_user_id: 2, endorsement_date: new Date().toISOString() }]);
  }
  if (!portfolio.profile.is_public) return <main className="private-profile"><Icon name="globe" /><h1>This portfolio is private.</h1></main>;
  return (
    <div ref={appRef} className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar fullName={portfolio.fullName} theme={theme} toggleTheme={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')} activeSection={activeSection} />
      <main id="main">
        <HeaderHero {...portfolio} />
        <div className="discipline-strip" aria-label="Creative disciplines"><div className="container"><span>DESIGN WITH PURPOSE</span><span className="strip-star">✳</span><span>DEVELOP WITH PRECISION</span><span className="strip-star">✳</span><span>DEPLOY WITH CONFIDENCE</span><span className="strip-star">✳</span></div></div>
        <Projects projects={portfolio.projects} comments={[...portfolioDB.Project_Comment, ...comments]} addComment={(comment) => setComments((rows) => [...rows, { ...comment, comment_id: Math.max(0, ...portfolioDB.Project_Comment.map((row) => row.comment_id), ...rows.map((row) => row.comment_id)) + 1 }])} />
        <Skills skills={portfolio.skills} endorsements={[...portfolioDB.Skill_Endorsement, ...endorsements]} toggleEndorsement={toggleEndorsement} />
        <Timeline experiences={portfolio.experiences} educations={portfolio.educations} />
        <Contact fullName={portfolio.fullName} user={portfolio.user} profile={portfolio.profile} links={portfolio.links} />
      </main>
      <footer className="footer container"><a className="wordmark" href="#home">rv<span>.</span></a><p>© {new Date().getFullYear()} {portfolio.fullName}. Made with intention.</p><a href="#home">Back to top <Icon name="diagonal" size={15} /></a></footer>
    </div>
  );
}
