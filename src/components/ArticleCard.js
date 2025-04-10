'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

export default function ArticleCard({ article, featured = false }) {
  return (
    <Link href={`/article/${article.slug}`}>
      <div className={`group ${featured ? 'md:grid md:grid-cols-2 gap-4' : ''}`}>
        <div className={`relative ${featured ? 'h-64 md:h-full' : 'h-48'}`}>
          <Image
            src={article.image_url || '/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover rounded-lg group-hover:opacity-90 transition-opacity"
          />
        </div>
        <div className={`mt-4 ${featured ? 'md:mt-0' : ''}`}>
          <div className="text-sm text-red-600 font-medium">{article.category_name}</div>
          <h3 className={`mt-1 font-semibold text-gray-900 group-hover:text-red-600 transition-colors
            ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
            {article.title}
          </h3>
          <p className="mt-2 text-gray-600 line-clamp-2">{article.summary}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>{article.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={article.published_at}>
              {format(new Date(article.published_at), 'MMM d, yyyy')}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
} 