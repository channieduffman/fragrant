/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('fragrances', (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.string('brand', 255).notNullable();
            table.integer('year_released').unsigned();
            table.string('description', 511);
            table.enum('gender', ['M', 'F', 'U']).notNullable();

            table.timestamps(true, true);
            table.unique(['name', 'brand']);
        })

        .createTable('scent_terms', (table) => {
            table.increments('id').primary();
            table.string('term', 255).notNullable().unique();
            table.enum('level', ['Family', 'Accord', 'Note']).notNullable();
            table.integer('parent_id')
                .unsigned()
                .references('id')
                .inTable('scent_terms')
                .onDelete('SET NULL');

            table.timestamps(true, true);
        })

        .createTable('fragrance_notes', (table) => {
            table.integer('fragrance_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('fragrances')
                .onDelete('CASCADE');
            table.integer('scent_term_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('scent_terms')
                .onDelete('CASCADE');
            table.enum('note_type', ['Base', 'Middle', 'Top']).notNullable();

            table.primary(['fragrance_id', 'scent_term_id']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('fragrance_notes')
        .dropTableIfExists('scent_terms')
        .dropTableIfExists('fragrances');
};
