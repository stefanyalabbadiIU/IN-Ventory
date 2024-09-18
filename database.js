import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const setupDatabase = () => {
    return open({
        filename: './public/database/products.db',
        driver: sqlite3.Database
    }).then(db => {
        return db.exec(`
            CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            )
        `).then(() => {
            return db.run(`
                INSERT INTO products`)
        })
    })
}