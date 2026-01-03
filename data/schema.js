import { db } from "./db.js";

export function initSchema() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS Board (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS TodoList (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            boardId INTEGER NOT NULL,
            sortOrder INTEGER NOT NULL
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS TodoCard (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            todoListId INTEGER NOT NULL
        );
    `);
}