import {commonFields} from "@/server/database/fields/commonFields.ts";
import {migrateFields} from "@/server/database/services/migrateFields.ts";

const collection = 'menu';
const choicesPosition = [
  {text: 'Inicio', value: 0},
  {text: 'Superior', value: 1},
  {text: 'Inferior', value: 2},
  {text: 'Pie de página', value: 3}
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

const fields = [
  commonFields.status,
  commonFields.date_created,
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
      },
      display: "labels",
      "display_options": {
        "choices": choicesPosition
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
] as any[];

export async function migrateFieldsMenu() {
  return await migrateFields(collection, fields);
}
