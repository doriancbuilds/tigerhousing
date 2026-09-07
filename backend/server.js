const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/properties", async (req, res) => {
            console.log("API ROUTE HIT");
    try {
        const result = await pool.query(
        `SELECT 
    properties.property_id,
    properties.name,
    properties.type,
    properties.location,
    properties.description,

    (
        SELECT json_agg(
            json_build_object(
                'room_type', traits.room_type,
                'apartment_size', traits.apartment_size,
                'floor_plan', traits.floor_plan,
                'semester_price', traits.semester_price,
                'academic_year_price', traits.academic_year_price,
                'academic_term_price', traits.academic_term_price,
                'summer_academic_term_price', traits.summer_academic_term_price,
                'extended_academic_term_price', traits.extended_academic_term_price
            )
        )
        FROM (
            SELECT
                room_types.name AS room_type,
                apartment_sizes.name AS apartment_size,
                property_prices.floor_plan,

                MAX(
                    CASE
                        WHEN property_prices.price_period = 'Per Semester'
                        THEN property_prices.price
                    END
                ) AS semester_price,

                MAX(
                    CASE
                        WHEN property_prices.price_period = 'Per Academic Year'
                        THEN property_prices.price
                    END
                ) AS academic_year_price,

                MAX(
                    CASE
                        WHEN property_prices.price_period = 'Academic Term'
                        THEN property_prices.price
                    END
                ) AS academic_term_price,

                MAX(
                    CASE
                        WHEN property_prices.price_period = 'Summer + Academic Term'
                        THEN property_prices.price
                    END
                ) AS summer_academic_term_price,

                MAX(
                    CASE
                        WHEN property_prices.price_period = 'Extended Academic Term'
                        THEN property_prices.price
                    END
                ) AS extended_academic_term_price

            FROM property_prices

            LEFT JOIN room_types
                ON property_prices.room_type_id = room_types.room_type_id

            LEFT JOIN apartment_sizes
                ON property_prices.apartment_size_id = apartment_sizes.apartment_size_id

            WHERE property_prices.property_id = properties.property_id

            GROUP BY
            apartment_sizes.name,
                room_types.name,
                property_prices.floor_plan
        ) AS traits
    ) AS traits,

    (
        SELECT json_agg(property_image.image_url)
        FROM property_image
        WHERE property_image.property_id = properties.property_id
    ) AS images,

    (
    SELECT json_agg(amenities.name)
    FROM property_amenities
    JOIN amenities
        ON property_amenities.amenity_id = amenities.amenity_id
    WHERE property_amenities.property_id = properties.property_id
) AS amenities

    FROM properties;`);
            console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});