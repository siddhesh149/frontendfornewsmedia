import { getArticles, getCategories } from "@/services/api";
import ArticleCard from "@/components/ArticleCard";
import Header from "@/components/Header";

export default async function Home() {
  const [articles, categories] = await Promise.all([
    getArticles({ featured: true }),
    getCategories()
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header categories={categories} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Article */}
        {articles.length > 0 && (
          <div className="mb-12">
            <ArticleCard article={articles[0]} featured={true} />
          </div>
        )}

        {/* Latest News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
} 