-- script to create users table and populate it with predefined values

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "login" VARCHAR(50) UNIQUE NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "age" VARCHAR(50) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO Users ("login", "password", "age", "isDeleted") VALUES 
    ('admin', 'admin1', 21, FALSE),
    ('user1', 'user1', 20, FALSE),
    ('user2', 'user2', 22, FALSE),
    ('user3', 'user3', 25, FALSE);
