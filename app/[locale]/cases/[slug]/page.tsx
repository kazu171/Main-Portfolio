import { getArticleBySlug, isWorkflow } from '@/lib/content';
import { generateArticleSchema } from '@/lib/schema/article';
import { JsonLd } from '@/components/json-ld';
import { ArticleContent, ArticleNotFound } from '@/components/article-content';

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

  return (
    <>
      <JsonLd data={articleSchema} />
      <ArticleContent article={article} locale={locale} />
    </>
  );
}
