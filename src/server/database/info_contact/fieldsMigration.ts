import {commonFields} from "@/server/database/fields/commonFields.ts";
import {migrateFields} from "@/server/database/services/migrateFields.ts";

const collection = 'info_contact';
const socialDisplayOptions = {
  facebook: {
    icon: 'facebook',
    color: '#0030F0',
  },
  instagram: {
    icon: 'instagram',
    color: '#CC00A0',
  },
  'x-twitter': {
    icon: 'square_x_twitter',
    color: '#CFD1D3',
  },
  tiktok: {
    icon: 'tiktok',
    color: '#000000',
  },
  youtube: {
    icon: 'youtube',
    color: '#FF0000',
  },
  'linkedin-in': {
    icon: 'linkedin',
    color: '#002FBD',
  },
  flickr: {
    icon: 'flickr',
    color: '#FF0084',
  },
  'pinterest-p': {
    icon: 'pinterest',
    color: '#FF9500',
  },
  google: {
    icon: 'google',
    color: '#9A5E09',
  },
}
const choicesSocials = [
  {text: 'Facebook', value: 'fa-brands fa-facebook'},
  {text: 'Instagram', value: 'fa-brands fa-instagram'},
  {text: 'X Twitter', value: 'fa-brands fa-x-twitter'},
  {text: 'TikTok', value: 'fa-brands fa-tiktok'},
  {text: 'YouTube', value: 'fa-brands fa-youtube'},
  {text: 'LinkedIn', value: 'fa-brands fa-linkedin-in'},
  {text: 'Flickr', value: 'fa-brands fa-flickr'},
  {text: 'Pinterest', value: 'fa-brands fa-pinterest-p'},
  {text: 'Google', value: 'fa-brands fa-google'},
];
const choicesOptionsSocials = choicesSocials.map(({text, value},) => ({
  text,
  value: value.toString(),
  ...socialDisplayOptions[value.replace('fa-brands fa-', '') as keyof typeof socialDisplayOptions]
}));

const fields = [
  commonFields.date_created,
  {
    "field": "phones",
    "type": "json",
    "schema": {
      "name": "phones",
      "data_type": "json",
      "default_value": null,
      "is_nullable": true,
      "is_unique": false,
    },
    "meta": {
      "field": "phones",
      "special": ["cast-json"],
      "interface": "list",
      "display_options": {
        "template": "{{ code }} {{ number }}"
      },
      "options": {
        "fields": [
          {
            "field": "code",
            "name": "code",
            "type": "string",
            "meta": {
              "field": "code",
              "width": "half",
              "type": "string",
              "required": true,
              "note": "Ejemplo: +1",
              "interface": "input",
              "options": {
                "placeholder": "+1"
              }
            }
          },
          {
            "field": "number",
            "name": "number",
            "type": "integer",
            "meta": {
              "field": "number",
              "width": "half",
              "type": "integer",
              "required": true,
              "interface": "input",
              "options": {
                "placeholder": "XXXXXXXXX",
                "softLength": 20,
                "clear": true,
                "trim": true
              }
            }
          }
        ]
      },
      "required": false,
      "searchable": true
    }
  },
  {
    "field": "emails",
    "type": "json",
    "schema": {
      "name": "emails",
      "data_type": "json",
      "is_nullable": true,
      "is_unique": false,
    },
    "meta": {
      "field": "emails",
      "special": [
        "cast-json"
      ],
      "interface": "list",
      "options": {
        "fields": [
          {
            "field": "email",
            "name": "email",
            "type": "string",
            "meta": {
              "field": "email",
              "width": "full",
              "type": "string",
              "required": true,
              "interface": "input",
              "options": {
                "placeholder": "example@gmail.com",
                "trim": true,
                "clear": true
              }
            }
          }
        ]
      },
      "required": false,
      "searchable": true
    }
  },
  {
    "field": "address",
    "type": "json",
    "schema": {
      "name": "address",
      "data_type": "json",
    },
    "meta": {
      "collection": "info_contact",
      "field": "address",
      "special": ["cast-json"],
      "interface": "list",
      "options": {
        "fields": [
          {
            "field": "address",
            "name": "address",
            "type": "string",
            "meta": {
              "field": "address",
              "type": "string",
              "required": true,
              "interface": "input",
              "options": {
                "placeholder": "Calle 123, Ciudad, País",
                "trim": true,
                "clear": true
              }
            }
          }
        ]
      },
      "required": false,
      "searchable": true
    }
  },
  {
    "field": "social",
    "type": "json",
    "schema": {
      "name": "social",
      "data_type": "json",
      "is_nullable": true,
      "is_unique": false,
    },
    "meta": {
      "field": "social",
      "special": ["cast-json"],
      "interface": "list",
      "options": {
        "fields": [
          {
            "field": "icon",
            "name": "icon",
            "type": "string",
            "meta": {
              "field": "icon",
              "width": "half",
              "type": "string",
              "required": true,
              "note": "Selecciona una red social",
              "interface": "select-dropdown",
              "options": {
                "choices": choicesSocials
              },
              "display": "labels",
              "display_options": {
                "choices": choicesOptionsSocials
              }
            }
          },
          {
            "field": "link",
            "name": "link",
            "type": "string",
            "meta": {
              "field": "link",
              "width": "half",
              "type": "string",
              "required": true,
              "interface": "input",
              "options": {
                "placeholder": "facebook.com",
                "clear": true,
                "trim": true
              }
            }
          }
        ],
        "sort": "type"
      },
      "display": "labels",
      "display_options": {
        "choices": choicesOptionsSocials
      },
      "required": false,
      "searchable": true
    }
  },
  {
    "field": "whatsapp",
    "type": "json",
    "schema": {
      "name": "whatsapp",
      "data_type": "json",
      "default_value": null,
      "is_nullable": true,
      "is_unique": false,
    },
    "meta": {
      "field": "whatsapp",
      "special": ["cast-json"],
      "interface": "list",
      "display_options": {
        "template": "{{ code }} {{ number }}"
      },
      "options": {
        "fields": [
          {
            "field": "code",
            "name": "code",
            "type": "string",
            "meta": {
              "field": "code",
              "width": "half",
              "type": "string",
              "required": true,
              "note": "Ejemplo: +1",
              "interface": "input",
              "options": {
                "placeholder": "+1"
              }
            }
          },
          {
            "field": "number",
            "name": "number",
            "type": "integer",
            "meta": {
              "field": "number",
              "width": "half",
              "type": "integer",
              "required": true,
              "interface": "input",
              "options": {
                "placeholder": "XXXXXXXXX",
                "softLength": 20,
                "clear": true,
                "trim": true
              }
            }
          }
        ]
      },
      "required": false,
      "searchable": true
    }
  },
];

export async function migrateFieldsInfoContact() {
  return await migrateFields(collection, fields);
}