import { defineField, defineType } from "sanity"

export const productSchema = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "array",
      of: [{ type: "block" }], // Portable Text
    }),
    defineField({
      name: "price",
      title: "Precio (USD)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Precio original (tachado)",
      type: "number",
    }),
    defineField({
      name: "coverImage",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "previewImages",
      title: "Imágenes de preview (galería)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "LUT Cinematográfico", value: "cinematic" },
          { title: "LUT Fashion", value: "fashion" },
          { title: "LUT Documentary", value: "documentary" },
          { title: "Power Grade", value: "power-grade" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "fileAsset",
      title: "Archivo .drx (descarga)",
      type: "file",
      options: { accept: ".drx,.zip" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "compatibleVersions",
      title: "Versiones compatibles de DaVinci Resolve",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["17", "18", "19", "20"],
        layout: "tags",
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Producto destacado",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "Publicado", value: "published" },
          { title: "Borrador", value: "draft" },
          { title: "Agotado", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "coverImage",
    },
  },
})