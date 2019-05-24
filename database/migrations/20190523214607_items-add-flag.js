export const up = (knex, Promise) =>
  knex.schema
    .alterTable('items', (table) => {
      table.boolean('purchased', false)
    })

export const down = (knex, Promise) =>
  knex.schema
    .alterTable('items', (table) => {
      table.dropColumn('purchased')
    })
