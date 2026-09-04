import {defineField} from 'sanity'

export function textField(
  name: string,
  title: string,
  options?: {rows?: number; description?: string},
) {
  return defineField({
    name,
    title,
    type: 'text',
    rows: options?.rows ?? 4,
    description: options?.description,
  })
}

export function stringField(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    type: 'string',
    description,
  })
}
