import {PinIcon} from '@sanity/icons/Pin'
import {defineType} from 'sanity'
import {textField} from '../shared'

export const locationsPage = defineType({
  name: 'locationsPage',
  title: 'Locations',
  type: 'document',
  icon: PinIcon,
  description:
    'Words on the Locations page. Addresses and maps stay in the website code. Click Publish when you are done.',
  fields: [
    textField('downtownLocation', 'Downtown', {
      rows: 4,
      description: 'Also used on the home page.',
    }),
    textField('minyanHouse', 'Minyan House', {
      rows: 4,
      description: 'Also used on the home page.',
    }),
    textField('cemeteryLead', 'Cemeteries introduction', {rows: 4}),
    textField('cemeteryMaryville', 'Maryville Cemetery', {rows: 3}),
    textField('cemeteryBethIsrael', 'Beth Israel Cemetery', {rows: 2}),
    textField('cemeteryBrithSholom', 'Brith Sholom Cemetery', {rows: 2}),
    textField('cemeteryNote', 'Visitor note', {rows: 3}),
  ],
})
