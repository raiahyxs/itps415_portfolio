import { useEffect, useRef, useState } from 'react';
import { portfolioDB, presentation } from '../data';
import Icon from './Icon';
const filters = ['All work', 'Web development', 'UI / UX', 'Cloud'];
function ProjectDetails({ project, comments, addComment, onClose }) {
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (!returnFocusRef.current) returnFocusRef.current = document.activeElement;
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = oldOverflow;
      queueMicrotask(() => { if (!dialog.isConnected) returnFocusRef.current?.focus(); });
    };
  }, []);
  function submit(event) {
    event.preventDefault();
    if (!text.trim()) { setStatus('Please write a comment first.'); return; }
    addComment({ project_id: project.project_id, user_id: 2, comment_text: text.trim(), created_at: new Date().toISOString() });
    setText('');
    setStatus('Comment added to this browser’s demo.');
  }
  return (
    <dialog className="project-dialog" ref={dialogRef} aria-labelledby="project-dialog-title" onCancel={onClose} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="dialog-inner"><button className="icon-button dialog-close" onClick={onClose} aria-label="Close project"><Icon name="close" /></button>
        <div className="dialog-gallery">{project.media.map((media) => <img key={media.project_media_id} src={media.media_url} alt={`${project.title} concept preview ${media.display_order + 1}`} />)}</div>
        <div className="dialog-content"><div className="eyebrow">PROJECT {String(project.project_id).padStart(2, '0')} / CONCEPT PREVIEW</div><h2 id="project-dialog-title">{project.title}</h2><p>{project.description}</p><div className="tags">{presentation.projectTools[project.project_id].map((tool) => <span key={tool}>{tool}</span>)}</div>
          {project.demo_url ? <a className="button button-primary" href={project.demo_url} target="_blank" rel="noreferrer">Open live demo <Icon name="diagonal" size={16} /></a> : <p className="demo-note">A static project showcase. A live demo link hasn’t been added yet.</p>}
          <div className="feedback-heading"><h3>Conversation <span>{comments.length}</span></h3><span className="small-label">SAMPLE FEEDBACK</span></div>
          <div className="comments-list">{comments.map((comment) => <article className="comment" key={comment.comment_id}><div className="comment-avatar">{comment.user_id === 2 ? 'D' : 'V'}</div><div><div className="comment-meta"><strong>{portfolioDB.User.find((user) => user.user_id === comment.user_id)?.role || 'Visitor'}</strong><time dateTime={comment.created_at}>{new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time></div><p>{comment.comment_text}</p></div></article>)}</div>
          <form onSubmit={submit} className="comment-form"><label htmlFor="project-comment">Join the conversation</label><textarea id="project-comment" rows="3" maxLength={1500} required placeholder="What do you think of this project?" value={text} onChange={(event) => setText(event.target.value)} /><div className="comment-form-bottom"><span className="demo-note">Posting as Demo visitor. Saved in this browser only.</span><button className="button button-primary" type="submit">Add comment <Icon name="plus" size={16} /></button></div><p className="form-status" role="status">{status}</p></form>
        </div>
      </div>
    </dialog>
  );
}
export default function Projects({ projects, comments, addComment }) {
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState(null);
  const visible = projects.filter((project) => filter === 'All work' || presentation.projectTags[project.project_id].includes(filter));
  return (
    <section id="projects" className="section projects-section container">
      <div className="section-heading reveal"><div><div className="eyebrow"><span className="section-number">01 /</span> SELECTED WORK</div><h2>Ideas brought <span className="serif-word">to life.</span></h2></div><p>A little creativity. A lot of intention.<br />A selection of things I’ve designed and built.</p></div>
      <div className="project-toolbar reveal"><div className="project-filters" role="group" aria-label="Filter projects">{filters.map((label) => <button key={label} className={filter === label ? 'selected' : ''} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}{label === 'All work' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div><span className="small-label" role="status">{String(visible.length).padStart(2, '0')} PROJECTS / ENDLESS POSSIBILITIES</span></div>
      <div className="projects-grid">{visible.map((project) => <article className={`project-card project-${project.project_id}`} key={project.project_id}><button className="project-visual" onClick={() => setSelected(project)} aria-label={`View ${project.title}`}><img src={project.media[0]?.media_url} alt={`${project.title} concept preview`} loading="lazy" />{project.is_featured && <span className="featured-label"><Icon name="star" size={12} /> FEATURED</span>}<span className="project-open"><Icon name="diagonal" size={21} /></span></button><div className="project-info"><div className="project-category"><span>{presentation.projectTags[project.project_id].join(' / ')}</span><span>0{project.project_id}</span></div><h3><button onClick={() => setSelected(project)}>{project.title}</button></h3><p>{project.description}</p><div className="project-bottom"><div className="tags">{presentation.projectTools[project.project_id].slice(0, 2).map((tool) => <span key={tool}>{tool}</span>)}</div><button className="project-details-link" onClick={() => setSelected(project)}>Explore <Icon name="arrow" size={16} /></button></div></div></article>)}</div>
      {selected && <ProjectDetails project={selected} comments={comments.filter((comment) => comment.project_id === selected.project_id)} addComment={addComment} onClose={() => setSelected(null)} />}
    </section>
  );
}
