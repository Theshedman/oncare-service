import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex
    .transaction(async (trx) => trx.schema
      .createSchemaIfNotExists('oncare-service')
      .then(() => trx.schema.hasTable('users')
        .then((tableExists: boolean) => {
          if (!tableExists) {
            return trx.schema
              .withSchema('oncare-service')
              .createTable('users', (tableBuilder: Knex.CreateTableBuilder) => {
                tableBuilder
                  .uuid('id')
                  .unique()
                  .notNullable()
                  .primary({ constraintName: 'users_id' });
                tableBuilder
                  .string('email')
                  .unique()
                  .notNullable();
                tableBuilder
                  .string('password')
                  .notNullable();
                tableBuilder
                  .string('first_name')
                  .notNullable();
                tableBuilder
                  .string('last_name')
                  .notNullable();
                tableBuilder
                  .string('phone')
                  .notNullable()
                  .unique();
                tableBuilder
                  .string('role')
                  .notNullable()
                  .defaultTo('user');
                tableBuilder
                  .timestamps(true, true);
              })
          }
        })))
}


export async function down(knex: Knex): Promise<void> {
  return knex
    .transaction(async (trx) => trx.schema
      .withSchema('oncare-service')
      .dropTableIfExists('users'));
}

