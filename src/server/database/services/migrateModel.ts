import {directus} from '@/server/directus';
import {createCollection} from '@directus/sdk';

export async function migrateModel(collection: string, schema: object) {
  try {
    await directus.request(createCollection(schema));
    console.log('Collection Created:', collection);
    return {res: `Collection Created: ${collection}`};
  } catch (err) {
    console.error(`Error: Trying create Collection ${collection}`, err);
    return {res: `Error: Trying create Collection ${collection} ${JSON.stringify(err, null, 2)}`};
  }
}
