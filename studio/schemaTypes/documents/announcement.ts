import { defineField, defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Details",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Optional path or URL, such as /times or a ShulCloud page.",
    }),
    defineField({
      name: "startsAt",
      title: "Show from",
      type: "datetime",
    }),
    defineField({
      name: "endsAt",
      title: "Hide after",
      type: "datetime",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", published: "published" },
    prepare({ title, published }) {
      return { title, subtitle: published === false ? "Hidden" : "Published" };
    },
  },
});
