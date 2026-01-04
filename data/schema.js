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
            sortOrder INTEGER NOT NULL,
            FOREIGN KEY (boardId) REFERENCES Board(id) ON DELETE CASCADE
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS TodoCard (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            todoListId INTEGER NOT NULL,
            FOREIGN KEY (todoListId) REFERENCES TodoList(id) ON DELETE CASCADE
        );
    `);

    db.exec(`
       CREATE TABLE IF NOT EXISTS Comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            createdAt TEXT NOT NULL DEFAULT (datetime('now')),
            author TEXT NOT NULL,
            isMine INTEGER NOT NULL CHECK (isMine IN (0, 1)),
            todoCardId INTEGER NOT NULL,
            FOREIGN KEY (todoCardId) REFERENCES TodoCard(id) ON DELETE CASCADE
        );
    `);
}