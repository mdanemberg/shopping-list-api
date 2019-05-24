export const up = (knex, Promise) =>
  knex.schema
    .createTable('items', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').unique().notNullable()
      table.uuid('category_id')
      table.foreign('category_id').references('id').inTable('categories')
      table.uuid('user_id')
      table.foreign('user_id').references('id').inTable('users')
      table.timestamps()
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('items')
