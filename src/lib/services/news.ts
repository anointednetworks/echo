import { z } from 'zod';
import { type NewsItem } from '../../types/news';

const newsItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  publishedAt: z.string(),
  source: z.object({
    name: z.string()
  })
});

const GNEWS_API_KEY = 'd4b2caad9994a7ab23342de021ede468';

export const newsService = {
  async getTopNews(): Promise<NewsItem[]> {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?lang=en&max=5&apikey=${GNEWS_API_KEY}`
      );
      const data = await response.json();
      
      return z.array(newsItemSchema).parse(data.articles);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      return [];
    }
  }
};