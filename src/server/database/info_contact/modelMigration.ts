import {directus} from '@/server/directus';
import {createCollection} from '@directus/sdk';

const collection = 'info_contact';

export async function migrateModelInfoContact() {
  try {
    await directus.request(
      createCollection({
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
      })
    );
    console.log('Colección Creadada', collection);
    return {res: `Colección Creadada: ${collection}`};
  } catch (err) {
    console.error('Error: Triying create Collection info_contact', err);
    return {res: 'Error creando colección: ' + collection + ' ' + JSON.stringify(err, null, 2)};
  }
}
