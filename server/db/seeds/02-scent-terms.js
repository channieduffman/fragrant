const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const tableName = 'scent_terms';
  const csvPath = path.join(__dirname, '.', 'data', 'scent_terms.csv');

  await knex(tableName).del();

  const records = [];

  const parseCSV = () => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          const record = {
            id: row.term_id,
            term: row.name,
            level: row.level,
            parent_id: (row.parent_id === '' || row.parent_id === null) ? null : parseInt(row.parent_id, 10),
          };
          records.push(record);
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  };

  try {
    await parseCSV();

    if (records.length > 0) {
      const chunkSize = 1000;
      await knex.batchInsert(tableName, records, chunkSize);
    } else {
      console.log("no records to insert");
    }
  } catch (error) {
    throw error;
  }
};
