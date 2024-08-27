import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { db } from "../../../connect";

function GET(req, res) {
  const sql =
    "INSERT INTO organizations (id, name, description) VALUES ($1, $2, $3);";
  const values = [Math.round(Math.random() * 100), "Gabe", "Works at puma"];
  db.run(sql, values, function (err) {
    if (err) {
      return console.error(err.message);
    }
  });
  return res.status(200).send({ success: true });
}

export default function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    // return POST();
  }

  if (req.method === "GET") {
    return GET(req, res);
  }

  return res.status(404).send();
}

// Define the GET request handler function
// export async function GET(req, res) {
//   return;
//   // Extract the "id" from the URL by splitting the URL and taking the last element
//   const id = req.url.split("/").pop();

//   // Log the extracted "id" to the console (for debugging purposes)
//   console.log(id);

//   // Check if the database instance has been initialized
//   if (!db) {
//     // If the database instance is not initialized, open the database connection
//     db = await open({
//       filename: "./collection.db", // Specify the database file path
//       driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
//     });
//   }

//   // Perform a database query to retrieve an item based on the id
//   const item = await db.get("SELECT * FROM items WHERE id = ?", id);

//   // Return the items as a JSON response with status 200
//   return new Response(JSON.stringify(item), {
//     headers: { "Content-Type": "application/json" },
//     status: 200,
//   });
// }
