import {UsersIcon} from '@sanity/icons/Users'
import {defineType} from 'sanity'
import {textField} from '../shared'

export const communityPage = defineType({
  name: 'communityPage',
  title: 'Community',
  type: 'document',
  icon: UsersIcon,
  description: 'Words on the Community page. Class flyers are edited separately. Click Publish when you are done.',
  fields: [
    textField('heroTitle', 'Headline', {rows: 2}),
    textField('heroLede', 'Introduction', {rows: 3}),
    textField('flyersLede', 'This week line', {
      rows: 2,
      description: 'Shown above office flyers.',
    }),
    textField('classesLede', 'Weekly classes line', {rows: 2}),
    textField('sisterhood', 'Sisterhood', {rows: 6}),
    textField('brotherhood', 'Brotherhood', {rows: 6}),
    textField('chevraKadisha', 'Chevra Kadisha', {rows: 5}),
    textField('chevraContact', 'Chevra Kadisha contact', {rows: 3}),
    textField('addlestone', 'Addlestone Hebrew Academy', {rows: 5}),
    textField('preschool', 'Preschool of the Arts', {rows: 4}),
    textField('rentalsSanctuary', 'Sanctuary rental', {rows: 2}),
    textField('rentalsHall', 'Social Hall rental', {rows: 2}),
  ],
})
