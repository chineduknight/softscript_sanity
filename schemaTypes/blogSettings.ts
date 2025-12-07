import {Rule} from 'sanity'

export default {
  name: 'blogSettings',
  title: 'Blog Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // disable create/delete if you want singleton
  fields: [
    {
      name: 'title',
      title: 'Blog title',
      type: 'string',
      description: 'Used for the /blog page title.',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle / tagline',
      type: 'text',
      rows: 2,
    },
    {
      name: 'defaultSeoTitle',
      title: 'Default SEO title',
      type: 'string',
      description: 'SEO title fallback for /blog and other blog pages.',
    },
    {
      name: 'defaultSeoDescription',
      title: 'Default SEO description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'defaultOgImage',
      title: 'Default Open Graph image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'postsPerPage',
      title: 'Posts per page',
      type: 'number',
      description: 'Used for pagination on /blog.',
      initialValue: 10,
    },
    {
      name: 'showRelatedPosts',
      title: 'Show related posts section',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showReadingTime',
      title: 'Show reading time',
      type: 'boolean',
      initialValue: true,
    },
  ],
}
