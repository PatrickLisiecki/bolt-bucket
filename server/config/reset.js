import { pool } from "./database.js";
import "./dotenv.js";
import exteriorData from "../data/exteriors.js";
import roofData from "../data/roofs.js";
import wheelsData from "../data/wheels.js";
import interiorData from "../data/interiors.js";
import carData from "../data/cars.js";

// Drop Cars Table First
const dropCarTableQuery = `
    DROP TABLE IF EXISTS cars CASCADE;
`;

// Drop other dependent tables
const dropDependentTablesQuery = `
    DROP TABLE IF EXISTS exteriors CASCADE;
    DROP TABLE IF EXISTS roofs CASCADE;
    DROP TABLE IF EXISTS wheels CASCADE;
    DROP TABLE IF EXISTS interiors CASCADE;
`;

// Create Exteriors Table
const createExteriorTableQuery = `
    CREATE TABLE IF NOT EXISTS exteriors (
        id SERIAL PRIMARY KEY,
        color VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL NOT NULL
    )
`;

// Create Roofs Table
const createRoofTableQuery = `
    CREATE TABLE IF NOT EXISTS roofs (
        id SERIAL PRIMARY KEY,
        color VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL NOT NULL,
        isConvertible BOOLEAN NOT NULL
    )
`;

// Create Wheels Table
const createWheelsTableQuery = `
    CREATE TABLE IF NOT EXISTS wheels (
        id SERIAL PRIMARY KEY,
        color VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL NOT NULL
    )
`;

// Create Interiors Table
const createInteriorTableQuery = `
    CREATE TABLE IF NOT EXISTS interiors (
        id SERIAL PRIMARY KEY,
        color VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL NOT NULL
    )
`;

// Create Cars Table
const createCarTableQuery = `
    CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        isConvertible BOOLEAN NOT NULL,
        exteriorId INT REFERENCES exteriors(id),
        roofId INT REFERENCES roofs(id),
        wheelsId INT REFERENCES wheels(id),
        interiorId INT REFERENCES interiors(id),
        price DECIMAL NOT NULL
    )
`;

const createTables = async () => {
    try {
        // Drop tables in the correct order
        await pool.query(dropCarTableQuery);
        console.log("Cars table dropped successfully");

        await pool.query(dropDependentTablesQuery);
        console.log("Dependent tables dropped successfully");

        // Now create the tables again
        await pool.query(createExteriorTableQuery);
        console.log("Exteriors table created successfully");

        await pool.query(createRoofTableQuery);
        console.log("Roofs table created successfully");

        await pool.query(createWheelsTableQuery);
        console.log("Wheels table created successfully");

        await pool.query(createInteriorTableQuery);
        console.log("Interiors table created successfully");

        await pool.query(createCarTableQuery);
        console.log("Cars table created successfully");
    } catch (err) {
        console.error("Error creating tables", err);
    }
};

// Seed Exteriors Table
const seedExteriorTable = async () => {
    exteriorData.forEach((exterior) => {
        const insertExteriorQuery = {
            text: `INSERT INTO exteriors (color, image, price) VALUES ($1, $2, $3)`,
            values: [exterior.color, exterior.image, exterior.price],
        };

        pool.query(insertExteriorQuery, (err, res) => {
            if (err) {
                console.error("Error inserting exterior", err);
                return;
            }
            console.log(`${exterior.color} exterior added successfully`);
        });
    });
};

// Seed Roofs Table
const seedRoofTable = async () => {
    roofData.forEach((roof) => {
        const insertRoofQuery = {
            text: `INSERT INTO roofs (color, image, price, isConvertible) VALUES ($1, $2, $3, $4)`,
            values: [roof.color, roof.image, roof.price, roof.isConvertible],
        };

        pool.query(insertRoofQuery, (err, res) => {
            if (err) {
                console.error("Error inserting roof", err);
                return;
            }
            console.log(`${roof.color} roof added successfully`);
        });
    });
};

// Seed Wheels Table
const seedWheelsTable = async () => {
    wheelsData.forEach((wheels) => {
        const insertWheelsQuery = {
            text: `INSERT INTO wheels (color, image, price) VALUES ($1, $2, $3)`,
            values: [wheels.color, wheels.image, wheels.price],
        };

        pool.query(insertWheelsQuery, (err, res) => {
            if (err) {
                console.error("Error inserting wheels", err);
                return;
            }
            console.log(`${wheels.color} wheels added successfully`);
        });
    });
};

// Seed Interiors Table
const seedInteriorTable = async () => {
    interiorData.forEach((interior) => {
        const insertInteriorQuery = {
            text: `INSERT INTO interiors (color, image, price) VALUES ($1, $2, $3)`,
            values: [interior.color, interior.image, interior.price],
        };

        pool.query(insertInteriorQuery, (err, res) => {
            if (err) {
                console.error("Error inserting interior", err);
                return;
            }
            console.log(`${interior.color} interior added successfully`);
        });
    });
};

// Seed Cars Table
const seedCarTable = async () => {
    carData.forEach((car) => {
        const insertCarQuery = {
            text: `INSERT INTO cars (name, isConvertible, exteriorId, roofId, wheelsId, interiorId, price) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            values: [
                car.name,
                car.isConvertible,
                car.exteriorId,
                car.roofId,
                car.wheelsId,
                car.interiorId,
                car.price,
            ],
        };

        pool.query(insertCarQuery, (err, res) => {
            if (err) {
                console.error("Error inserting car", err);
                return;
            }
            console.log(`${car.name} car added successfully`);
        });
    });
};

const seedDatabase = async () => {
    await createTables();
    await seedExteriorTable();
    await seedRoofTable();
    await seedWheelsTable();
    await seedInteriorTable();
    await seedCarTable();
};

seedDatabase();
