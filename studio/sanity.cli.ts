import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3jfxxcrm',
    dataset: 'production',
  },
  studioHost: 'bsbisynagogue',
  deployment: {
    autoUpdates: true,
    appId: 'h5onu295v1e335sh9zzgthq2',
    studioHost: 'bsbisynagogue',
  },
  typegen: {
    enabled: true,
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
    overloadClientMethods: true,
  },
})
