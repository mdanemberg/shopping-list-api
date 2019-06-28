export const up = (knex, Promise) =>
  knex.schema
    .createTable('lists', table => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').unique().notNullable()
      table.uuid('user_id')
      table.foreign('user_id').references('id').inTable('users')
      table.timestamps()
    })
    .createTable('list_items', table => {
      table.uuid('id').unique().primary().notNullable()
      table.uuid('list_id')
      table.foreign('list_id').references('id').inTable('lists')
      table.uuid('item_id')
      table.foreign('item_id').references('id').inTable('items')
    })
    .createTable('messages', table => {
      table.uuid('id').unique().primary().notNullable()
      table.string('text')
      table.uuid('user_id')
      table.foreign('user_id').references('id').inTable('users')
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('items')
