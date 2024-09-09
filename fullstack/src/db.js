// src/db.js
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const connectionString = process.env.DATABASE_URL; // Ensure this is set in your .env file

const db = pgp(connectionString);

export default db;
