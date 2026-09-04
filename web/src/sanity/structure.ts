import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("BSBI")
    .items([
      S.documentTypeListItem("flyer").title("Flyers"),
      S.divider(),
      S.listItem()
        .title("More")
        .id("more")
        .child(
          S.list()
            .title("More")
            .items([
              S.listItem()
                .title("Homepage words")
                .id("homepage")
                .child(S.document().schemaType("homepage").documentId("homepage")),
              S.documentTypeListItem("announcement").title("Announcements"),
              S.documentTypeListItem("event").title("Extra events"),
              S.documentTypeListItem("weeklyClass").title("Class details"),
              S.documentTypeListItem("photo").title("Photo gallery"),
              S.documentTypeListItem("staffBio").title("Staff"),
            ]),
        ),
    ]);
