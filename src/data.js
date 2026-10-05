import portrait from './assets/pfp.jpg';

// Fixtures use the SQL table names, columns, and foreign keys. No database or authentication.
const sampleUsers = Array.from({ length: 45 }, (_, index) => ({
  user_id: index + 3, email: `visitor${index + 1}@example.com`, password: 'STATIC_DEMO_ONLY',
  role: 'Sample visitor', created_at: '2024-01-15T08:00:00Z',
}));
export const portfolioDB = {
  User: [
    { user_id: 1, email: 'vasquez.rhealyn.dll@gmail.com', password: 'STATIC_DEMO_ONLY', role: 'Graphic Designer | Web Developer | Cloud Engineer', created_at: '2024-01-15T08:00:00Z' },
    { user_id: 2, email: 'demo.visitor@example.com', password: 'STATIC_DEMO_ONLY', role: 'Demo visitor', created_at: '2024-01-15T08:00:00Z' },
    ...sampleUsers,
  ],
  Profile: [{ profile_id: 1, user_id: 1, last_name: 'Vasquez', first_name: 'Rhealyn', middle_name: 'Mendoza', bio: 'Crafting beautiful digital experiences through intuitive graphic design, scalable web architectures, and reliable cloud solutions.', is_public: true }],
  Project: [
    { project_id: 1, profile_id: 1, title: 'Travel Planner Web App', description: 'A thoughtful travel companion that brings itineraries, destinations, and unforgettable adventures into one seamless experience.', demo_url: 'https://travore.netlify.app/', is_featured: true },
    { project_id: 2, profile_id: 1, title: 'Pet Adoption System', description: 'A welcoming platform connecting animal shelters with future pet owners. Designed to make finding a new best friend a little easier.', demo_url: 'https://petadoptionsystemproject.netlify.app/', is_featured: true },
    { project_id: 3, profile_id: 1, title: 'Data Analytics', description: 'Turning complex datasets into clear, actionable insights through responsive visualizations and an intuitive dashboard.', demo_url: 'https://github.com/raiahyxs/Data-Analytics', is_featured: true },
  ],
  Project_media: [
    { project_media_id: 1, project_id: 1, media_url: '/projects/travel.svg', display_order: 0 },
    { project_media_id: 2, project_id: 2, media_url: '/projects/pets.svg', display_order: 0 },
    { project_media_id: 3, project_id: 3, media_url: '/projects/analytics.svg', display_order: 0 },
  ],
  Skills: [
    { skill_id: 1, profile_id: 1, category: 'Graphic Design (Adobe CC)', year_acquired: 2020, certification_token: 'ADBE-GD-2020' },
    { skill_id: 2, profile_id: 1, category: 'Web Development (React/JS)', year_acquired: 2022, certification_token: 'REACT-WEB-2022' },
    { skill_id: 3, profile_id: 1, category: 'Cloud Computing (AWS/GCP)', year_acquired: 2023, certification_token: 'AWS-Cloud-2023' },
  ],
  Analytic: [{ analytics_id: 1, profile_id: 1, viewers_count: 15420, visited_time: '2024-05-20T10:30:00Z' }],
  Experience: [
    { experience_id: 1, profile_id: 1, company_name: 'Tech Cloud Solutions', job_title: 'Cloud Engineer & Web Developer', start_date: '2024-01-01', end_date: null, description: 'Managing cloud infrastructure deployments and building responsive, full-stack web applications.' },
    { experience_id: 2, profile_id: 1, company_name: 'Creative Designs Studio', job_title: 'Graphic Designer', start_date: '2022-06-01', end_date: '2023-12-31', description: 'Created branding materials, UI/UX mockups, and marketing assets for a range of clients.' },
  ],
  Education: [
    { education_id: 1, profile_id: 1, institution_name: 'Dalubhasaan ng Lungsod ng Lucena', degree: 'Bachelor of Science in Information Technology', field_of_study: 'Information Technology', graduation_year: 2027 },
    { education_id: 2, profile_id: 1, institution_name: 'College of Sciences, Technology, and Communication Lucena', degree: 'Senior High School', field_of_study: 'SHS Graduate', graduation_year: 2023 },
    { education_id: 3, profile_id: 1, institution_name: 'Cotta National High School', degree: 'High School', field_of_study: 'Junior High Graduate', graduation_year: 2021 },
    { education_id: 4, profile_id: 1, institution_name: 'Lucena East III', degree: 'Elementary', field_of_study: 'Elementary Graduate', graduation_year: 2016 },
  ],
  Social_Link: [
    { link_id: 1, profile_id: 1, platform_name: 'Facebook', url: 'https://www.facebook.com/' },
    { link_id: 2, profile_id: 1, platform_name: 'GitHub', url: 'https://github.com/' },
    { link_id: 3, profile_id: 1, platform_name: 'LinkedIn', url: 'https://www.linkedin.com/' },
  ],
  Message: [],
  Project_Comment: [
    { comment_id: 1, project_id: 1, user_id: 3, comment_text: 'This made planning my vacation so much easier!', created_at: '2024-03-12T10:00:00Z' },
    { comment_id: 2, project_id: 2, user_id: 4, comment_text: 'Beautiful UI, and it really helps pets find homes faster.', created_at: '2024-04-05T10:00:00Z' },
    { comment_id: 3, project_id: 3, user_id: 5, comment_text: 'The charts are incredibly responsive and well-designed.', created_at: '2024-05-20T10:00:00Z' },
  ],
  Skill_Endorsement: [45, 38, 24].flatMap((count, index) => sampleUsers.slice(0, count).map((user, userIndex) => ({ endorsement_id: index * 100 + userIndex + 1, skill_id: index + 1, endorser_user_id: user.user_id, endorsement_date: '2024-05-20T10:00:00Z' }))),
};

// Display-only details live separately from the schema-shaped records.
export const presentation = {
  portrait, location: 'Lucena City, Philippines',
  projectTags: { 1: ['Web development', 'UI / UX'], 2: ['Web development', 'UI / UX'], 3: ['Cloud', 'UI / UX'] },
  projectTools: { 1: ['React', 'JavaScript', 'Responsive UI'], 2: ['UI / UX', 'Web design', 'Prototyping'], 3: ['Data visualization', 'Cloud', 'Dashboard'] },
  skillDetails: {
    1: { title: 'Design with intention.', icon: 'design', description: 'Visual identities and interfaces that connect people with ideas.', tools: ['Photoshop', 'Illustrator', 'Figma'] },
    2: { title: 'Build for the web.', icon: 'code', description: 'Responsive, accessible experiences with thoughtful interactions.', tools: ['React', 'JavaScript', 'HTML & CSS'] },
    3: { title: 'Think beyond the screen.', icon: 'cloud', description: 'Reliable infrastructure that gives great experiences room to grow.', tools: ['AWS', 'Google Cloud', 'Deployment'] },
  },
};
export function getPortfolio(profileId = 1) {
  const profile = portfolioDB.Profile.find((row) => row.profile_id === profileId);
  const forProfile = (table) => portfolioDB[table].filter((row) => row.profile_id === profileId);
  return {
    fullName: [profile.first_name, profile.middle_name, profile.last_name].filter((name) => name?.trim()).map((name) => name.trim()).join(' '),
    profile, user: portfolioDB.User.find((row) => row.user_id === profile.user_id),
    projects: forProfile('Project').map((project) => ({ ...project, media: portfolioDB.Project_media.filter((row) => row.project_id === project.project_id).sort((a, b) => a.display_order - b.display_order) })),
    skills: forProfile('Skills'), experiences: forProfile('Experience'), educations: forProfile('Education'), links: forProfile('Social_Link'), analytics: forProfile('Analytic'),
  };
}
