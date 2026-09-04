import { defineField, defineType } from "sanity";

export const weeklyClass = defineType({
  name: "weeklyClass",
  title: "Weekly class",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "teacher",
      title: "Teacher",
      type: "string",
    }),
    defineField({
      name: "when",
      title: "When",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "where",
      title: "Where",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Flyer",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "when", media: "image" },
  },
});
