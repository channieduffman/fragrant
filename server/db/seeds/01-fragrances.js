const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const tableName = 'fragrances';
  const csvPath = path.join(__dirname, '.', 'data', 'fragrances.csv');

  await knex(tableName).del();

  const records = [];

  const parseCSV = () => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          const record = {
            id: row.fragrance_id,
            name: row.name,
            brand: row.brand,
            year_released: (row.year_released === '' || row.year_released == null) ? null : parseInt(row.year_released, 10),
            description: row.description,
            gender_focus: row.gender_focus,
            image_url: row.image_url,
            created_at: new Date(),
            updated_at: new Date(),
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
