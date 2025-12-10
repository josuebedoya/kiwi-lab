import {directus} from "@/server/directus";
import {createField} from '@directus/sdk';

const collection = 'menu';
const choicesPosition = [
  {text: 'Inicio', value: 0},
  {text: 'Superior', value: 1},
  {text: 'Inferior', value: 2},
  {text: 'Pie de página', value: 3}
];

const choicesStatus = [
  {text: 'Borrador', value: 'draft'},
  {text: 'Publicado', value: 'published'},
  {text: 'Archivado', value: 'archived'}
];

const fieldTitle = {
  type: 'string',
  field: 'title',
  schema: {
    type: 'string',
    name: 'Título',
    max_length: 300,
    is_nullable: false
  },
  meta: {
    interface: 'input',
    options: {
      placeholder: 'Título',
      trim: true
    },
    required: true
  }
}
const fieldLink = {
  field: 'link',
  type: 'string',
  schema: {
    type: 'string',
    name: 'URL',
    max_length: 300,
    is_nullable: false
  },
  meta: {
    interface: 'input',
    options: {
      placeholder: 'URL'
    },
    required: true
  }
}

export async function migrateFieldsMenu() {
  try {
    const fields = [
      {
        field: 'status',
        type: 'string',
        schema: {
          type: 'string',
          name: 'Estado',
          default_value: 'published',
          is_nullable: false,
          max_length: 50
        },
        meta: {
          interface: 'select-dropdown',
          options: {
            choices: choicesStatus
          },
          required: true
        }
      },
      fieldTitle,
      fieldLink,
      {
        field: 'position',
        type: 'integer',
        schema: {
          type: 'integer',
          name: 'Posición',
          default_value: 0,
          is_nullable: false
        },
        meta: {
          interface: 'select-dropdown',
          options: {
            choices: choicesPosition
          }
        }
      },
      {
        field: 'sub_items',
        type: 'json',
        meta: {
          special: ["cast-json"],
          interface: 'list',
          options: {
            fields: [fieldTitle, fieldLink]
          }
        },
        schema: {
          name: 'sub_items',
          is_nullable: true,
        }
      }
    ];

    const res= {};

    for (const f of fields) {
      await directus.request(createField(collection, f));
      res[f.field] = 'creado ✔';
      console.log('Field created:', f.field);
    }

    return {res: `Fields: ${JSON.stringify(res, null,2)} Creados En la collection`, collection  };
  } catch (err) {
    console.error('Error: Triying create Fields menu', err);
    return {res: 'Error creando  Fields en la collection: ' + collection + ' ' + JSON.stringify(err, null, 2)};
  }
}
