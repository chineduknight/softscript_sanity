import {Rule} from 'sanity'

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. Founder, Music Director, Guest Writer',
    },
    {
      name: 'bio',
      title: 'Short bio',
      type: 'text',
      rows: 3,
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'e.g. X (Twitter), YouTube, Instagram',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule: Rule) => rule.uri({scheme: ['http', 'https']}),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
}
