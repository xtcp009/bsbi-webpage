import {CaseIcon} from '@sanity/icons/Case'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {stringField, textField} from '../shared'

export const hotelsPage = defineType({
  name: 'hotelsPage',
  title: 'Hotels',
  type: 'document',
  icon: CaseIcon,
  description: 'Hotel list for visitors. Click Publish when you are done.',
  fields: [
    defineField({
      name: 'hotels',
      title: 'Hotels',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            stringField('name', 'Name'),
            stringField('addr', 'Address'),
            stringField('dist', 'Distance from the shul'),
            stringField('phone', 'Phone'),
            defineField({
              name: 'eruv',
              title: 'Eruv',
              type: 'string',
              options: {
                list: [
                  {title: 'Inside the eruv', value: 'inside'},
                  {title: 'Outside the eruv', value: 'outside'},
                ],
                layout: 'radio',
              },
              initialValue: 'inside',
            }),
            textField('note', 'Note', {
              rows: 2,
              description: 'Optional, such as motion-sensor lights or congregation rate.',
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'addr'},
          },
        }),
      ],
    }),
  ],
})
