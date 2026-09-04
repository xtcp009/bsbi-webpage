import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const singletonTypes = new Set([
  'homepage',
  'aboutPage',
  'visitPage',
  'hotelsPage',
  'kosherPage',
  'communityPage',
  'mikvahPage',
  'eruvPage',
  'remembrancePage',
  'locationsPage',
  'membershipPage',
  'donatePage',
])

export default defineConfig({
  name: 'default',
  title: 'BSBI',
  projectId: '3jfxxcrm',
  dataset: 'production',
  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (prev) => {
      const allowed = prev.filter((template) => !singletonTypes.has(template.schemaType))
      const flyer = allowed.find((template) => template.schemaType === 'flyer')
      const rest = allowed.filter((template) => template.schemaType !== 'flyer')
      return flyer ? [flyer, ...rest] : allowed
    },
  },
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      const withoutSingletons = prev.filter((template) => !singletonTypes.has(template.templateId))
      if (creationContext.type === 'global') {
        return withoutSingletons.filter((template) => template.templateId === 'flyer')
      }
      return withoutSingletons
    },
  },
})
