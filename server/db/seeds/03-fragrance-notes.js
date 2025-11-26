const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const tableName = 'fragrance_notes';
  const csvPath = path.join(__dirname, '.', 'data', 'fragrance_notes.csv');

  await knex(tableName).del();

  const records = [];

  const parseCSV = () => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          const record = {
            fragrance_id: row.fragrance_id,
            scent_term_id: row.term_id,
            note_type: row.note_type,
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
