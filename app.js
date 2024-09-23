import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import { setupDatabase, getDBConnection, populateDB } from "./database.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkAndPopulateDB = async () => {
    try {
        await setupDatabase();
        const db = await getDBConnection();
        const products = await db.all('SELECT COUNT(*) as count FROM products');

        if (products[0].count === 0) {
            await populateDB();
        } else {
            console.log('Database already populated. Skipping population.');
        }
    } catch (error) {
        console.error('Error checking or populating the database:', error);
    }
};

checkAndPopulateDB();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    getDBConnection()
        .then((db) => {
            return db.all('SELECT * FROM products');
        })
        .then((products) => {
            res.render('pages/product', { data: products, title: "Products" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});


app.get("/about", (req, res) => {
    res.render("pages/about", { title: "About Us" });
});

app.get("/contact", (req, res) => {
    res.render("pages/contact", { title: "Contact Us" });
});


app.listen(port, () => {
    console.log(`App listening at port ${port}.`);
});

