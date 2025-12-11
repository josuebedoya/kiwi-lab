import {directus} from "@/server/directus";
import {createField} from '@directus/sdk';

export async function migrateFields(collection: string, fields: any[]) {
  try {
    const res = {} as Record<string, string>;

    for (const f of fields) {
      await directus.request(createField(collection, f));
      res[f.field] = 'creado ✔';
      console.log('Field created:', f.field);
    }

    return {res: `Fields: ${JSON.stringify(res, null, 2)}. Creados En la collection`, collection};
  } catch (err) {
    console.error(`Error: Trying create Fields in ${collection}`, err);
    return {res: `Error: Trying create Fields in ${collection} ${JSON.stringify(err, null, 2)}`};
  }
}
