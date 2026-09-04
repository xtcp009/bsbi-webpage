import {HeartFilledIcon} from '@sanity/icons/HeartFilled'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {textField} from '../shared'

export const donatePage = defineType({
  name: 'donatePage',
  title: 'Donate',
  type: 'document',
  icon: HeartFilledIcon,
  description:
    'Words on the Donate page. Online giving still goes to ShulCloud. Click Publish when you are done.',
  fields: [
    textField('donateMember', 'Member note', {
      rows: 4,
      description: 'Shown at the top of the Donate page.',
    }),
    textField('donatePortalNote', 'Online giving note', {
      rows: 2,
      description: 'The line above the Give online button.',
    }),
    defineField({
      name: 'donateFunds',
      title: 'Funds',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Names of funds people can give to.',
    }),
  ],
})
