import {Rule} from 'sanity'

const difficultyOptions = [
  {title: 'Beginner', value: 'beginner'},
  {title: 'Intermediate', value: 'intermediate'},
  {title: 'Advanced', value: 'advanced'},
]

const useCaseOptions = [
  {title: 'Mass', value: 'mass'},
  {title: 'Competition', value: 'competition'},
  {title: 'Wedding', value: 'wedding'},
  {title: 'Practice', value: 'practice'},
  {title: 'Theory / Teaching', value: 'theory'},
]

export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: Rule) =>
        rule.required().min(10).max(90).warning('Keep titles between 10–90 characters'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short summary used in cards and SEO description fallback.',
      type: 'text',
      rows: 3,
      validation: (rule: Rule) =>
        rule.required().min(30).max(200).warning('Aim for 30–160 characters'),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for screen readers and SEO.',
          validation: (rule: Rule) =>
            rule.required().error('Alt text is required for accessibility'),
        },
      ],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
        },
        {type: 'image'},
        // add custom blocks later (e.g. callouts) if you want
      ],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      validation: (rule: Rule) =>
        rule.required().min(1).warning('At least one category helps readers and SEO'),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'Used for ordering and visibility in the blog.',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'updatedAt',
      title: 'Last updated at',
      type: 'datetime',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this post in the blog hero section',
      initialValue: false,
    },
    {
      name: 'difficulty',
      title: 'Choir difficulty',
      type: 'string',
      options: {
        list: difficultyOptions,
        layout: 'radio',
      },
    },
    {
      name: 'useCase',
      title: 'Use case',
      type: 'string',
      options: {
        list: useCaseOptions,
        layout: 'dropdown',
      },
    },
    {
      name: 'relatedScriptIds',
      title: 'Related ChoirScript IDs',
      description: 'Optional IDs of related scripts in the main library.',
      type: 'array',
      of: [{type: 'string'}],
    },
    // SEO
    {
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      description: 'Overrides page <title>. Leave empty to use post title.',
      validation: (rule: Rule) => rule.max(60),
    },
    {
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      description: 'Meta description for search and social. Fallback is excerpt.',
      rows: 2,
      validation: (rule: Rule) => rule.max(160),
    },
    {
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      description: 'Custom image for social sharing. Fallback is main image.',
      options: {hotspot: true},
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage',
    },
    prepare(selection: {title?: string; subtitle?: string; media?: any}) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '',
        media,
      }
    },
  },
}
