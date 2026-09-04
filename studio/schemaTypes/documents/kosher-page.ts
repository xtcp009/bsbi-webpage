import {IceCreamIcon} from '@sanity/icons/IceCream'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {stringField, textField} from '../shared'

export const kosherPage = defineType({
  name: 'kosherPage',
  title: 'Kosher',
  type: 'document',
  icon: IceCreamIcon,
  description: 'Chef Linda and kosher places. Click Publish when you are done.',
  fields: [
    textField('chefLinda', 'Chef Linda', {
      rows: 4,
      description: 'Also used on the Visit page.',
    }),
    textField('chefLindaContact', 'Chef Linda contact', {rows: 2}),
    defineField({
      name: 'kosherPlaces',
      title: 'Kosher places',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            stringField('name', 'Name'),
            stringField('where', 'Address'),
            textField('body', 'Details', {rows: 3}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'where'},
          },
        }),
      ],
    }),
  ],
})
