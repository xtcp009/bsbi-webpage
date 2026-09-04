import {HeartIcon} from '@sanity/icons/Heart'
import {defineType} from 'sanity'
import {stringField, textField} from '../shared'

export const remembrancePage = defineType({
  name: 'remembrancePage',
  title: 'Remembrance',
  type: 'document',
  icon: HeartIcon,
  description: 'Words on the Remembrance page and the home-page memorial section. Click Publish when you are done.',
  fields: [
    stringField('remembranceWall', 'Wall name'),
    textField('remembranceTag', 'Short introduction', {rows: 3}),
    stringField('remembranceTitle', 'Section title', 'Also used on the home page.'),
    stringField('remembranceFund', 'Fund name'),
    textField('remembranceBody', 'About the wall', {rows: 6}),
    textField('remembranceLegacy', 'Legacy', {rows: 4}),
    textField('remembranceNote', 'Dedication note', {rows: 3}),
    textField('remembranceContact', 'How to dedicate a plaque', {rows: 3}),
    textField('remembranceWhen', 'Plaque contribution', {rows: 2}),
  ],
})
