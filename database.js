import sqlite3 from "sqlite3";
import { open } from 'sqlite';

export const setupDatabase = () => {
    return open({
        filename: './public/database/products.db',
        driver: sqlite3.Database
    }).then(db => {
        return db.exec(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                price REAL,
                category TEXT
            )
        `)
    });
};

export const populateDB = () => {
    return open({
        filename: './public/database/products.db',
        driver: sqlite3.Database
    }).then((db) => {
        return db.run(`
                INSERT INTO products (name, description, price, category)
                VALUES
                ('Espresso', 'Strong and rich espresso made with freshly ground beans.', 2.50, 'Coffee'),
                ('Cappuccino', 'A smooth blend of espresso, steamed milk, and foam.', 3.50, 'Coffee'),
                ('Latte', 'Creamy latte made with steamed milk and a shot of espresso.', 4.00, 'Coffee'),
                ('Mocha', 'Espresso with chocolate syrup, steamed milk, and whipped cream.', 4.50, 'Coffee'),
                ('Iced Coffee', 'Chilled brewed coffee served over ice.', 2.75, 'Coffee'),
                ('Matcha Latte', 'Steamed milk with high-quality matcha green tea.', 4.75, 'Tea'),
                ('Chai Tea Latte', 'Spiced black tea mixed with steamed milk.', 4.25, 'Tea'),
                ('Blueberry Muffin', 'Freshly baked muffin with juicy blueberries.', 2.75, 'Pastry'),
                ('Croissant', 'Flaky, buttery croissant freshly baked.', 3.00, 'Pastry'),
                ('Bagel with Cream Cheese', 'Toasted bagel served with a side of cream cheese.', 3.50, 'Pastry')
        `);
    }).then(() => {
        console.log('Coffee shop database setup complete.');
    });
}

export const getDBConnection = () => {
    return open({
        filename: './public/database/products.db',
        driver: sqlite3.Database
    });
};