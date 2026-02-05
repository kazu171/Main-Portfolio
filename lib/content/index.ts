export { workflows } from './workflows';
export { caseStudies } from './case-studies';
export type { WorkflowArticle, CaseStudyArticle, Article, SolutionCategory, Locale } from './types';
export { isWorkflow, isCaseStudy } from './types';

import { workflows } from './workflows';
import { caseStudies } from './case-studies';
import { Article } from './types';

export function getAllArticles(): Article[] {
  return [...workflows, ...caseStudies].filter((a) => a.enabled !== false);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getWorkflowsByCategory(category: 'A' | 'B' | 'C') {
  return workflows.filter((w) => w.solutionCategory === category);
}
