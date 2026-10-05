import Icon from './Icon';
const formatDate = (date) => date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';
export default function Timeline({ experiences, educations }) {
  return (
    <section id="timeline" className="section container journey-section">
      <div className="section-heading reveal"><div><div className="eyebrow"><span className="section-number">03 /</span> THE JOURNEY</div><h2>A story of <span className="serif-word">evolution.</span></h2></div><p>Every experience adds a new perspective.<br />Here’s what has shaped mine.</p></div>
      <div className="journey-grid"><div className="journey-column reveal"><div className="journey-heading"><Icon name="briefcase" /><h3>Experience</h3><span>{String(experiences.length).padStart(2, '0')}</span></div><div className="timeline">{experiences.map((experience) => <article className="timeline-item" key={experience.experience_id}><span className={`timeline-dot ${experience.end_date === null ? 'current' : ''}`} /><div className="timeline-date"><span>{formatDate(experience.start_date)} — {formatDate(experience.end_date)}</span>{experience.end_date === null && <span className="current-badge">CURRENT</span>}</div><h4>{experience.job_title}</h4><p className="institution">{experience.company_name}</p><p>{experience.description}</p></article>)}</div><div className="journey-quote"><span>✳</span><p>“Good design makes it beautiful.<br />Good engineering makes it possible.”</p></div></div>
      <div className="journey-column reveal"><div className="journey-heading"><Icon name="education" /><h3>Education</h3><span>{String(educations.length).padStart(2, '0')}</span></div><div className="education-list">{educations.map((education) => <article className="education-card" key={education.education_id}><div className="education-year">{education.graduation_year}<small>{education.graduation_year > new Date().getFullYear() ? 'EXPECTED' : 'CLASS OF'}</small></div><div><h4>{education.degree}</h4><p>{education.institution_name}</p><span>{education.field_of_study}</span></div><Icon name="diagonal" size={16} /></article>)}</div></div></div>
    </section>
  );
}
