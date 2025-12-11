import {migrateModel} from "@/server/database/services/migrateModel.ts";

const collection = 'info_contact' as string;
const schema = {
  collection: collection,
  meta: {
    icon: 'perm_phone_msg',
    note: 'Información de contacto',
    singleton: true
  },
  schema: {
    name: collection,
    comment: 'Información de contacto del sitio',
  },
} as const;

export async function migrateModelInfoContact() {
  return await migrateModel(collection, schema)
}
