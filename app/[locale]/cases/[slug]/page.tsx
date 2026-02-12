import { getArticleBySlug, isWorkflow } from '@/lib/content';
import { generateArticleSchema } from '@/lib/schema/article';
import { generateHowToSchema, parseWorkflowStep } from '@/lib/schema/howto';
import { JsonLd } from '@/components/json-ld';
import { ArticleContent, ArticleNotFound } from '@/components/article-content';
import type { WorkflowArticle } from '@/lib/content';

interface PageProps {
  params: Promise<{ locale: 'en' | 'ja'; slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return <ArticleNotFound locale={locale} />;
  }

  // Generate Article schema for JSON-LD
  const articleSchema = generateArticleSchema(
    {
      slug: article.slug,
      title: locale === 'en' ? article.titleEn : article.titleJa,
      description: locale === 'en' ? article.descriptionEn : article.descriptionJa,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      heroImage: article.heroImage,
      articleType: isWorkflow(article) ? 'workflow' : 'case-study',
    },
    locale
  );

  // Generate HowTo schema for workflow articles (step-by-step tutorials)
  let howToSchema = null;
  if (isWorkflow(article)) {
    const workflowArticle = article as WorkflowArticle;
    const steps = workflowArticle.sections.howItWorks[locale];

    howToSchema = generateHowToSchema(
      {
        slug: workflowArticle.slug,
        title: locale === 'en' ? workflowArticle.titleEn : workflowArticle.titleJa,
        description: locale === 'en' ? workflowArticle.directAnswerEn : workflowArticle.directAnswerJa,
        heroImage: workflowArticle.heroImage,
        steps: steps.map(parseWorkflowStep),
        tools: workflowArticle.techStack,
      },
      locale
    );
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      {howToSchema && <JsonLd data={howToSchema} />}
      <ArticleContent article={article} locale={locale} />
    </>
  );
}
