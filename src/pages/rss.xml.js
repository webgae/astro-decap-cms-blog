// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { fetchDatoCMS } from '../lib/datocms.js';
import { slugify } from '../utils.js';

export async function GET(context) {
  const query = `
    query AllArticulos {
      allArticulos(orderBy: _firstPublishedAt_DESC) {
        titulo
        _firstPublishedAt
        contenidoPost
      }
    }
  `;

  const data = await fetchDatoCMS({ query });
  const posts = data.allArticulos;

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.titulo,
      pubDate: post._firstPublishedAt,
      description: post.contenidoPost.substring(0, 150) + '...', // Truncate description
      link: `/blog/${slugify(post.titulo)}/`, // Generate slug from title
    })),
  });
}