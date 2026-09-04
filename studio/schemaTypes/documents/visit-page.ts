import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {textField} from '../shared'

export const visitPage = defineType({
  name: 'visitPage',
  title: 'Visit',
  type: 'document',
  icon: EarthGlobeIcon,
  description: 'Words on the Visit page. Click Publish when you are done.',
  fields: [
    textField('visitLead', 'Headline', {rows: 2}),
    textField('visitBody', 'Introduction', {
      rows: 5,
      description: 'Also used as the introduction on the Hotels page.',
    }),
    textField('visitorCenter', 'Visitor center', {rows: 3}),
    textField('visitCharm', 'Charleston today', {rows: 3}),
    defineField({
      name: 'visitAmenities',
      title: 'Why Charleston',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    textField('visitHospitality', 'Hospitality line', {rows: 2}),
    textField('shabbosHouse', 'Shabbos House', {rows: 5}),
    textField('shabbosHouseDetails', 'House details', {rows: 5}),
    textField('shabbosHouseReserve', 'How to reserve', {rows: 4}),
  ],
})
