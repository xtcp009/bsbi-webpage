import {BookIcon} from '@sanity/icons/Book'
import {defineType} from 'sanity'
import {textField} from '../shared'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'History',
  type: 'document',
  icon: BookIcon,
  description: 'Words on the History page. Click Publish when you are done.',
  fields: [
    textField('rabbiWelcome', 'Welcome', {
      rows: 3,
      description: 'Opens the History page and the “Our story” section on the home page.',
    }),
    textField('rabbiBody', 'Congregation story', {rows: 6}),
    textField('historyLead', 'Congregation history', {
      rows: 6,
      description: 'Also used as the history paragraph on the home page.',
    }),
    textField('facilities', 'Facilities and community', {rows: 6}),
    textField('history1956', '1956', {rows: 5}),
    textField('rabbiToday', 'The congregation today', {rows: 6}),
    textField('rabbiClose', 'Closing welcome', {rows: 4}),
  ],
})
