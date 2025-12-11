const choicesStatus = [
  {text: 'Borrador', value: 'draft'},
  {text: 'Publicado', value: 'published'},
  {text: 'Archivado', value: 'archived'}
];

export const commonFields = {
  date_created: {
    field: 'date_created',
    type: 'timestamp',
    schema: {
      type: 'timestamp',
      name: 'Fecha de creación',
      data_type: "timestamp with time zone",
    },
    meta: {
      interface: 'datetime',
      display: "datetime",
      field: "date_created",
      special: [
        "date-created",
        "date-updated"
      ],
      display_options: {
        "relative": true
      },
      readonly: true,
      width: "half",
      required: false,
      hidden: true,
    }
  },
  status: {
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
}