-- CREATE DATABASE
CREATE DATABASE zentelladb;

-- USE DATABASE

USE zentelladb;

-- TABLE PLAYERS

CREATE TABLE players (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(60) NOT NULL UNIQUE,
    nickname VARCHAR(60),
    element VARCHAR(5) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    postion VARCHAR(2) NOT NULL,
    year VARCHAR(2) NOT NULL,
    sprite TEXT NOT NULL
)

CREATE TABLE league (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(60) NOT NULL,
    description TEXT,
    image TEXT
)

CREATE TABLE player_league (
    player_id BINARY(16) REFERENCES players(id),
    league_id BINARY(16) REFERENCES league(id),
    average INT,
    PRIMARY KEY (player_id, league_id)
)