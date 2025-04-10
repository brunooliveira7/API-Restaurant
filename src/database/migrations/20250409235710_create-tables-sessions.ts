import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tables_sessions", (table) => {
    table.increments("id").primary();
    //chave estrangeira - referencia a tabela de mesas
    table.integer("table_id").notNullable().references("id").inTable("tables");
    table.timestamp("opened_at").defaultTo(knex.fn.now());
    table.time("closed_at"); //padrão é null - vazio 
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tables_sessions");
}
