import { getArticleBySlug, getCategories, getArticles } from "@/services/api";
import Header from "@/components/Header";
import Image from "next/image";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }) {
  const [article, categories, allArticles] = await Promise.all([
    getArticleBySlug(params.slug),
    getCategories(),
    getArticles()
  ]);

  if (!article) {
    notFound();
  }

  // Get related articles (same category, excluding current article)
  const relatedArticles = allArticles
    .filter(a => a.category_id === article.category_id && a.id !== article.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header categories={categories} />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-96">
            <Image
              src={article.image_url || '/placeholder.jpg'}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="text-sm text-red-600 font-medium">{article.category_name}</div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">{article.title}</h1>
            
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <time dateTime={article.published_at}>
                {format(new Date(article.published_at), 'MMMM d, yyyy')}
              </time>
            </div>

            {/* Social Sharing Buttons */}
            <div className="mt-6 flex items-center space-x-4">
              <span className="text-sm text-gray-500">Share:</span>
              <button className="text-blue-600 hover:text-blue-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="text-blue-400 hover:text-blue-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="text-green-600 hover:text-green-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5-.5z"/>
                </svg>
              </button>
            </div>

            <div className="mt-8 prose prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <a
                  key={relatedArticle.id}
                  href={`/article/${relatedArticle.slug}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={relatedArticle.image_url || '/placeholder.jpg'}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-sm text-red-600">{relatedArticle.category_name}</span>
                      <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-red-600">
                        {relatedArticle.title}
                      </h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
} 