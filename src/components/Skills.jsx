import { presentation } from '../data';
import Icon from './Icon';
export default function Skills({ skills, endorsements, toggleEndorsement }) {
  return (
    <section id="skills" className="section expertise-section"><div className="container">
      <div className="section-heading reveal"><div><div className="eyebrow"><span className="section-number">02 /</span> MY EXPERTISE</div><h2>Creative meets <span className="serif-word">technical.</span></h2></div><p>Different disciplines. One connected vision.<br />The tools I use to turn possibilities into reality.</p></div>
      <div className="skills-grid">{skills.map((skill, index) => {
        const details = presentation.skillDetails[skill.skill_id];
        const skillEndorsements = endorsements.filter((row) => row.skill_id === skill.skill_id);
        const endorsed = skillEndorsements.some((row) => row.endorser_user_id === 2);
        return <article className="skill-card reveal" key={skill.skill_id} style={{ '--reveal-delay': `${index * 90}ms` }}><div className="skill-top"><span className="skill-icon"><Icon name={details.icon} size={27} /></span><span className="small-label">0{index + 1} / SINCE {skill.year_acquired}</span></div><h3>{details.title}</h3><p>{details.description}</p><div className="skill-category">{skill.category}</div><div className="tags">{details.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><div className="skill-bottom"><span><Icon name="star" size={15} /><strong aria-live="polite">{skillEndorsements.length}</strong> demo endorsements</span><button className={`endorse-button ${endorsed ? 'endorsed' : ''}`} aria-pressed={endorsed} onClick={() => toggleEndorsement(skill.skill_id)} title="Toggle a demo endorsement saved in this browser"><Icon name={endorsed ? 'check' : 'plus'} size={15} />{endorsed ? 'Endorsed' : 'Endorse'}</button></div>{skill.certification_token && <span className="certification">Certification: {skill.certification_token}</span>}</article>;
      })}</div><p className="section-footnote"><span className="status-dot" /> Always learning. Always building. <span>Endorsements are a browser-only demo.</span></p>
    </div></section>
  );
}
