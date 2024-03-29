import Knex from 'knex'

export async function up(knex: Knex){
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name', 40).notNullable()
        table.string('avatar').notNullable()
        table.string('whatsapp', 14).notNullable()
        table.string('bio').notNullable()
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('users')
}