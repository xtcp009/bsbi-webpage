import {DropIcon} from '@sanity/icons/Drop'
import {defineType} from 'sanity'
import {textField} from '../shared'

export const mikvahPage = defineType({
  name: 'mikvahPage',
  title: 'Mikvah',
  type: 'document',
  icon: DropIcon,
  description: 'Words on the Mikvah page. Click Publish when you are done.',
  fields: [
    textField('mikvahLead', 'Appointments', {
      rows: 4,
      description: 'How to reserve the mikvah.',
    }),
    textField('mikvahDishes', 'Dish mikvah', {rows: 4}),
    textField('mikvahQuestions', 'Other questions', {rows: 3}),
  ],
})
