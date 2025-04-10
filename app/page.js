import { getArticles, getCategories, getTrendingArticles } from "@/services/api";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { searchArticles } from "@/services/api";

export default async function Home() {
  const [articles, categories, trendingArticles] = await Promise.all([
    getArticles(),
    getCategories(),
    getTrendingArticles()
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header categories={categories} />
      
      {/* Search Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form className="relative" onSubmit={async (e) => {
            e.preventDefault();
            const query = e.target.search.value;
            if (query) {
              const results = await searchArticles(query);
              // Handle search results (you might want to show them in a modal or redirect to a search page)
              console.log('Search results:', results);
            }
          }}>
            <input
              type="text"
              name="search"
              placeholder="Search news..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button 
              type="submit"
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Article */}
        {articles.length > 0 && (
          <div className="mb-12">
            <Link href={`/article/${articles[0].slug}`}>
              <div className="relative h-[500px] rounded-lg overflow-hidden group">
                <Image
                  src={articles[0].image_url || '/placeholder.jpg'}
                  alt={articles[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <span className="inline-block px-3 py-1 text-sm text-white bg-red-600 rounded-full">
                      {articles[0].category_name}
                    </span>
                    <h1 className="mt-4 text-4xl font-bold text-white">
                      {articles[0].title}
                    </h1>
                    <p className="mt-2 text-lg text-gray-200">
                      {articles[0].content.substring(0, 200)}...
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
            <div className="space-y-6">
              {articles.slice(1).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Trending Articles */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trending Now</h3>
              <div className="space-y-4">
                {trendingArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    href={`/article/${article.slug}`}
                    className="block group"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={article.image_url || '/placeholder.jpg'}
                          alt={article.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <span className="text-sm text-red-600">{article.category_name}</span>
                        <h4 className="mt-1 font-medium text-gray-900 group-hover:text-red-600">
                          {article.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 mb-4">Get the latest news delivered to your inbox.</p>
              <form 
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  try {
                    await subscribeNewsletter(email);
                    alert('Successfully subscribed to newsletter!');
                    e.target.reset();
                  } catch (error) {
                    alert('Failed to subscribe. Please try again.');
                  }
                }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 