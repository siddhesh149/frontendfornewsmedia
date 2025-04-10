import { getArticleBySlug, getCategories } from "@/services/api";
import Header from "@/components/Header";
import Image from "next/image";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }) {
  const [article, categories] = await Promise.all([
    getArticleBySlug(params.slug),
    getCategories()
  ]);

  if (!article) {
    notFound();
  }

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

            <div className="mt-8 prose prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
} 