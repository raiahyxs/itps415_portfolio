import { useState } from 'react';
import { portfolioDB } from '../data';
import useLocalState from '../hooks/useLocalState';
import Icon from './Icon';
export default function Contact({ fullName, user, profile, links }) {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [messages, setMessages] = useLocalState('rv-messages-v1', portfolioDB.Message, (rows) => Array.isArray(rows) && rows.every((row) => row && row.sender_user_id === 2 && row.receiver_profile_id === profile.profile_id && typeof row.content === 'string'));
  async function copyEmail() {
    try { await navigator.clipboard.writeText(user.email); setStatus('Email address copied.'); } catch { setStatus(`Email me at ${user.email}`); }
  }
  function submit(event) {
    event.preventDefault();
    if (!content.trim()) { setStatus('Please write a message first.'); return; }
    setMessages((rows) => [...rows, { message_id: Math.max(0, ...rows.map((row) => row.message_id)) + 1, sender_user_id: 2, receiver_profile_id: profile.profile_id, content: content.trim(), sent_at: new Date().toISOString() }]);
    setContent('');
    setStatus('Demo message saved in this browser. Nothing was sent. Use the email link to get in touch.');
  }
  return (
    <section id="contact" className="section contact-section"><div className="container contact-layout">
      <div className="contact-copy reveal"><div className="eyebrow"><span className="section-number">04 /</span> NEXT CHAPTER</div><h2>Great things<br />start with<br /><span className="serif-word accent">a hello.</span><span className="contact-asterisk" aria-hidden="true">✳</span></h2><p>Have an idea, a project, or just something to share?<br />I’d love to hear from you.</p><div className="email-row"><a href={`mailto:${user.email}`}>{user.email}<Icon name="diagonal" size={19} /></a><button className="icon-button" onClick={copyEmail} aria-label="Copy email address"><Icon name="copy" size={17} /></button></div><div className="social-links">{links.map((link) => <a href={link.url} key={link.link_id} target="_blank" rel="noreferrer" title={`${link.platform_name} example platform link`}>{link.platform_name}<Icon name="diagonal" size={14} /></a>)}</div><p className="demo-note">Social links are platform placeholders. Personal URLs can be added later.</p></div>
      <form className="contact-form reveal" onSubmit={submit}><div className="contact-form-heading"><Icon name="message" /><h3>Let’s connect.</h3><span className="demo-badge">STATIC DEMO</span></div><p>A little note could be the start of something great.</p><div className="sender-card"><span className="comment-avatar">D</span><div><strong>Demo visitor</strong><small>To {fullName}</small></div><Icon name="arrow" size={18} /></div><label htmlFor="contact-content">Your message <span>*</span></label><textarea id="contact-content" rows="5" maxLength={5000} required value={content} onChange={(event) => setContent(event.target.value)} placeholder="Tell me about your idea…" /><div className="form-character-count">{content.length} / 5,000</div><button className="button button-primary" type="submit">Save demo message <Icon name="diagonal" size={17} /></button><p className="demo-note">Saved locally as Demo visitor. To send a real message, use the email link.</p>{messages.length > 0 && <div className="saved-messages"><span>{messages.length} demo message{messages.length === 1 ? '' : 's'} saved</span><button type="button" onClick={() => { setMessages([]); setStatus('Demo messages cleared from this browser.'); }}>Clear saved messages</button></div>}<p className="form-status" role="status">{status}</p></form>
    </div></section>
  );
}
