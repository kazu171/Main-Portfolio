export type SolutionCategory = 'A' | 'B' | 'C';
export type ArticleCategory = 'workflow' | 'case-study';
export type Locale = 'en' | 'ja';

export interface WorkflowArticle {
  slug: string;
  category: 'workflow';
  enabled?: boolean;
  solutionCategory: SolutionCategory;
  titleEn: string;
  titleJa: string;
  descriptionEn: string;
  descriptionJa: string;
  techStack: string[];
  heroImage: string;
  sections: {
    problem: { en: string; ja: string };
    solution: { en: string; ja: string };
    howItWorks: { en: string[]; ja: string[] };
    results: { en: string; ja: string };
  };
}

export interface CaseStudyArticle {
  slug: string;
  category: 'case-study';
  enabled?: boolean;
  titleEn: string;
  titleJa: string;
  descriptionEn: string;
  descriptionJa: string;
  heroImage: string;
  persona: {
    nameEn: string;
    nameJa: string;
    businessTypeEn: string;
    businessTypeJa: string;
    locationEn: string;
    locationJa: string;
    revenue: string;
    staffSize: string;
  };
  painPoints: { en: string[]; ja: string[] };
  workflows: string[];
  results: {
    metricEn: string;
    metricJa: string;
    before: string;
    after: string;
  }[];
  narrativeEn: string;
  narrativeJa: string;
}

export type Article = WorkflowArticle | CaseStudyArticle;

export function isWorkflow(article: Article): article is WorkflowArticle {
  return article.category === 'workflow';
}

export function isCaseStudy(article: Article): article is CaseStudyArticle {
  return article.category === 'case-study';
}
