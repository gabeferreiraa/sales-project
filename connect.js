const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
export const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQLite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create a table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS organizations (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created organizations table.");
    }
  );

  // Add more tables as needed
  // Example: Creating another table for users
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      organization_id INTEGER,
      name TEXT,
      email TEXT,
      FOREIGN KEY (organization_id) REFERENCES organizations(id)
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created users table.");
    }
  );
});

// Instructions for CRUD operations

// INSERT INTO a table
const insertData = (table, columns, values) => {
  const placeholders = values.map(() => "?").join(", ");
  const sql = `INSERT INTO ${table} (${columns.join(
    ", "
  )}) VALUES (${placeholders})`;

  db.run(sql, values, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows inserted, ID: ${this.lastID}`);
  });
};

// SELECT data from a table
const fetchData = (table, callback) => {
  const sql = `SELECT * FROM ${table}`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
};

// UPDATE data in a table
const updateData = (table, updates, condition) => {
  const setClause = updates.map((update) => `${update.column} = ?`).join(", ");
  const sql = `UPDATE ${table} SET ${setClause} WHERE ${condition.column} = ?`;
  const values = updates.map((update) => update.value).concat(condition.value);

  db.run(sql, values, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows updated: ${this.changes}`);
  });
};

// DELETE data from a table
const deleteData = (table, condition) => {
  const sql = `DELETE FROM ${table} WHERE ${condition.column} = ?`;

  db.run(sql, condition.value, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Rows deleted: ${this.changes}`);
  });
};

// Example usage
// insertData('organizations', ['name', 'description'], ['My Org', 'This is a description']);
// fetchData('organizations', (rows) => console.log(rows));
// updateData('organizations', [{ column: 'name', value: 'Updated Org' }], { column: 'id', value: 1 });
// deleteData('organizations', { column: 'id', value: 1 });

// Close the database connection after all operations
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log("Closed the database connection.");
// });
