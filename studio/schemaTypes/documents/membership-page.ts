import {UserIcon} from '@sanity/icons/User'
import {defineType} from 'sanity'
import {textField} from '../shared'

export const membershipPage = defineType({
  name: 'membershipPage',
  title: 'Membership',
  type: 'document',
  icon: UserIcon,
  description: 'Words on the Membership page. The application file stays in the website. Click Publish when you are done.',
  fields: [
    textField('membershipLead', 'Introduction', {rows: 3}),
    textField('membershipBody', 'Application note', {rows: 2}),
    textField('membershipApplicationNote', 'How to return the form', {rows: 3}),
  ],
})
