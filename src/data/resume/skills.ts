export interface Skill {
  title: string;
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
}

const skills: Skill[] = [
  // Data, ML & AI
  { title: 'Scikit-learn', competency: 4, category: ['Data, ML & AI'] },
  { title: 'Pandas', competency: 5, category: ['Data, ML & AI'] },
  { title: 'NumPy', competency: 4, category: ['Data, ML & AI'] },
  { title: 'Random Forest', competency: 4, category: ['Data, ML & AI'] },
  { title: 'Gradient Boosting', competency: 4, category: ['Data, ML & AI'] },
  {
    title: 'Supervised Learning',
    competency: 4,
    category: ['Data, ML & AI'],
  },
  {
    title: 'Feature Importance Analysis',
    competency: 4,
    category: ['Data, ML & AI'],
  },
  {
    title: 'Hypothesis Testing',
    competency: 4,
    category: ['Data, ML & AI'],
  },
  {
    title: 'TF-IDF Vectorization',
    competency: 4,
    category: ['Data, ML & AI'],
  },
  { title: 'Cosine Similarity', competency: 4, category: ['Data, ML & AI'] },
  { title: 'Vector Databases', competency: 3, category: ['Data, ML & AI'] },
  { title: 'RAG', competency: 3, category: ['Data, ML & AI'] },
  // Programming & Frameworks
  { title: 'Python', competency: 5, category: ['Programming & Frameworks'] },
  { title: 'R', competency: 3, category: ['Programming & Frameworks'] },
  { title: 'SQL', competency: 4, category: ['Programming & Frameworks'] },
  {
    title: 'TypeScript',
    competency: 4,
    category: ['Programming & Frameworks'],
  },
  {
    title: 'JavaScript',
    competency: 4,
    category: ['Programming & Frameworks'],
  },
  { title: 'C++', competency: 3, category: ['Programming & Frameworks'] },
  { title: 'Java', competency: 3, category: ['Programming & Frameworks'] },
  { title: 'Next.js', competency: 4, category: ['Programming & Frameworks'] },
  { title: 'React', competency: 4, category: ['Programming & Frameworks'] },
  { title: 'Django', competency: 3, category: ['Programming & Frameworks'] },
  { title: 'HTML/CSS', competency: 4, category: ['Programming & Frameworks'] },
  { title: 'SCSS', competency: 3, category: ['Programming & Frameworks'] },
  { title: 'Git', competency: 4, category: ['Programming & Frameworks'] },
  // Data Infrastructure & Tools
  {
    title: 'PostgreSQL',
    competency: 4,
    category: ['Data Infrastructure & Tools'],
  },
  {
    title: 'MySQL',
    competency: 3,
    category: ['Data Infrastructure & Tools'],
  },
  {
    title: 'SQLite',
    competency: 3,
    category: ['Data Infrastructure & Tools'],
  },
  {
    title: 'Supabase',
    competency: 3,
    category: ['Data Infrastructure & Tools'],
  },
  {
    title: 'Power BI',
    competency: 4,
    category: ['Data Infrastructure & Tools'],
  },
  {
    title: 'Tableau',
    competency: 3,
    category: ['Data Infrastructure & Tools'],
  },
  {
    title: 'ServiceNow',
    competency: 3,
    category: ['Data Infrastructure & Tools'],
  },
  {
    title: 'Excel',
    competency: 4,
    category: ['Data Infrastructure & Tools'],
  },
  {
    title: 'Google Sheets',
    competency: 4,
    category: ['Data Infrastructure & Tools'],
  },
  // Languages
  { title: 'English (Native)', competency: 5, category: ['Languages'] },
  {
    title: 'Spanish (Limited Working Proficiency)',
    competency: 3,
    category: ['Languages'],
  },
  // Interests
  { title: 'Statistics', competency: 4, category: ['Interests'] },
  { title: 'Piano', competency: 4, category: ['Interests'] },
  { title: 'Fine Art', competency: 4, category: ['Interests'] },
  { title: 'Muay Thai', competency: 3, category: ['Interests'] },
  { title: 'History', competency: 3, category: ['Interests'] },
  { title: 'Philosophy', competency: 3, category: ['Interests'] },
  { title: 'Teaching', competency: 4, category: ['Interests'] },
  { title: 'Reading', competency: 4, category: ['Interests'] },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

/**
 * Build categories from skills, all using the accent color token.
 */
function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.flatMap(({ category }) => category)),
  ).sort();

  return uniqueCategories.map((category) => ({
    name: category,
    color: 'var(--color-accent)',
  }));
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
