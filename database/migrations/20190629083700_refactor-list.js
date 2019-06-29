export const up = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('list_items')
    .dropTableIfExists('lists')
    .createTable('lists', table => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').unique().notNullable()
      table.uuid('user_id')
      table.foreign('user_id').references('id').inTable('users')
      table.timestamps()
    })
    .alterTable('items', table => {
      table.uuid('list_id')
      table.foreign('list_id').references('id').inTable('lists')
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('items')
