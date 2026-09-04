import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const flyer = defineType({
  name: 'flyer',
  title: 'Flyer',
  type: 'document',
  icon: ImageIcon,
  description: 'A picture to show on the website. The words can stay in the image.',
  fields: [
    defineField({
      name: 'image',
      title: 'Flyer picture',
      type: 'image',
      description: 'Upload the flyer. You do not need to retype the words on it.',
      options: {hotspot: true},
      validation: (rule) => rule.required().error('Add the flyer picture.'),
    }),
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'A short name so you can find this later, such as Lunch and Learn.',
      validation: (rule) => rule.required().error('Add a short name.'),
    }),
    defineField({
      name: 'status',
      title: 'Show on the website?',
      type: 'string',
      options: {
        list: [
          {title: 'Yes — show it', value: 'published'},
          {title: 'No — keep it hidden', value: 'hidden'},
        ],
        layout: 'radio',
      },
      initialValue: 'published',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endsAt',
      title: 'Hide after this date',
      type: 'datetime',
      description: 'Optional. Use this for a one-time event so the flyer comes down by itself.',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'newest',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
    {
      title: 'Name',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', status: 'status', media: 'image'},
    prepare({title, status, media}) {
      return {
        title: title || 'Untitled flyer',
        subtitle: status === 'hidden' ? 'Hidden' : 'On the website',
        media,
      }
    },
  },
})
