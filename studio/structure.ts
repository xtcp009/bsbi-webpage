import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {ImageIcon} from '@sanity/icons/Image'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

function pageItem(S: StructureBuilder, id: string, title: string, schemaType = id) {
  return S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(schemaType).documentId(id).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('BSBI')
    .items([
      S.listItem()
        .title('Flyers')
        .id('flyers')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('flyer')
            .title('Flyers')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
            .initialValueTemplates([S.initialValueTemplateItem('flyer')]),
        ),
      S.divider(),
      S.listItem()
        .title('Website words')
        .id('website-words')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Website words')
            .items([
              pageItem(S, 'homepage', 'Homepage'),
              pageItem(S, 'aboutPage', 'History'),
              pageItem(S, 'visitPage', 'Visit'),
              pageItem(S, 'hotelsPage', 'Hotels'),
              pageItem(S, 'kosherPage', 'Kosher'),
              pageItem(S, 'communityPage', 'Community'),
              pageItem(S, 'mikvahPage', 'Mikvah'),
              pageItem(S, 'eruvPage', 'Eruv'),
              pageItem(S, 'remembrancePage', 'Remembrance'),
              pageItem(S, 'locationsPage', 'Locations'),
              pageItem(S, 'membershipPage', 'Membership'),
              pageItem(S, 'donatePage', 'Donate'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('More')
        .id('more')
        .child(
          S.list()
            .title('More')
            .items([
              S.documentTypeListItem('announcement').title('Announcements'),
              S.documentTypeListItem('event').title('Extra events'),
              S.documentTypeListItem('weeklyClass').title('Class details'),
              S.documentTypeListItem('photo').title('Photo gallery'),
              S.documentTypeListItem('staffBio').title('Staff'),
            ]),
        ),
    ])
