import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {stringField, textField} from '../shared'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  description: 'Words at the top of the home page. Click Publish when you are done.',
  fields: [
    textField('tagline', 'Tagline', {
      rows: 3,
      description: 'The sentence under the congregation name.',
    }),
    textField('welcome', 'Welcome line', {
      rows: 2,
      description: 'Shown beside the entrance photograph.',
    }),
    textField('dailyServices', 'Daily services', {
      rows: 3,
      description: 'Shown on the home page and the Services page.',
    }),
    textField('doorsOpen', 'Congregation life', {
      rows: 2,
      description: 'The short line above the community photographs.',
    }),
    defineField({
      name: 'milestones',
      title: 'History timeline',
      type: 'array',
      description: 'The 1854 / 1948 / 1956 notes on the home page.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            stringField('year', 'Year'),
            textField('body', 'What happened', {rows: 3}),
          ],
          preview: {
            select: {title: 'year', subtitle: 'body'},
          },
        }),
      ],
    }),
  ],
})
