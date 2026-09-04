import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  description: "Programs to show in addition to the live ShulCloud calendar.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "string",
    }),
    defineField({
      name: "when",
      title: "When",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      initialValue: "/calendar",
    }),
    defineField({
      name: "startDate",
      title: "Date",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "when" },
  },
});
