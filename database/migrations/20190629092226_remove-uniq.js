export const up = (knex, Promise) =>
  knex.schema
    .alterTable('items', table => {
      table.dropColumn('name')
    })
    .alterTable('items', table => {
      table.string('name')
    })
    .alterTable('lists', table => {
      table.dropColumn('name')
    })
    .alterTable('lists', table => {
      table.string('name')
    })
    .alterTable('categories', table => {
      table.dropColumn('name')
    })
    .alterTable('categories', table => {
      table.string('name')
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('items')
