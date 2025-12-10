import {directus} from '@/server/directus';
import {createCollection} from '@directus/sdk';

const collection = 'menu';

export async function migrateModelMenu() {
  try {
    await directus.request(
      createCollection({
        collection: collection,
        meta: {
          icon: 'menu',
          note: 'Menú Collection',
        },
        schema: {
          name: collection,
          comment: 'Menu items',
        },
      })
    );
    console.log('Colección Creadada', collection);
    return {res: `Colección Creadada: ${collection}`};
  } catch (err) {
    console.error('Error: Triying create Collection menu', err);
    return {res: 'Error creando colección: ' + collection + ' ' + JSON.stringify(err, null, 2)};
  }
}
