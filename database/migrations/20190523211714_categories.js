export const up = (knex, Promise) =>
  knex.schema
    .createTable('categories', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').unique().notNullable()
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('categories')
