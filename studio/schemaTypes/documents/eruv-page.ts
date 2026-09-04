import {CircleIcon} from '@sanity/icons/Circle'
import {defineType} from 'sanity'
import {textField} from '../shared'

export const eruvPage = defineType({
  name: 'eruvPage',
  title: 'Eruv',
  type: 'document',
  icon: CircleIcon,
  description:
    'Words on the Eruv page. Up or down status still comes from ShulCloud. Click Publish when you are done.',
  fields: [
    textField('eruvRabbi', 'Questions', {
      rows: 2,
      description: 'Shown under the live eruv status.',
    }),
    textField('eruvDowntown', 'Downtown eruv', {rows: 6}),
    textField('eruvWest', 'South Windermere eruv', {rows: 3}),
    textField('eruvPerimeter', 'Perimeter note', {rows: 3}),
  ],
})
