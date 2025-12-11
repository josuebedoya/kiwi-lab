import {migrateModel} from "@/server/database/services/migrateModel.ts";

const collection = 'menu' as string;

const schema = {
  collection: collection,
  meta: {
    icon: 'menu',
    note: 'Menú Collection',
  },
  schema: {
    name: collection,
    comment: 'Menu items',
  },
} as const;

export async function migrateModelMenu() {
  return await migrateModel(collection, schema)
}
