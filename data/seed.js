import { boardData, todoCardData, todoListData } from "./data.js";
import { db } from "./db.js";

export function seedData() {
    seedBoards();
    seedTodoLists();
    seedTodoCards();
}

function seedBoards() {
    const boardCount = db
        .prepare("SELECT COUNT(*) as count FROM board")
        .get();

    if (boardCount.count > 0) {
        console.log("✅ boards already seeded");
    }
    else {

        const insert = db.prepare(`
    INSERT INTO board (title)
    VALUES (?)
  `);

        const insertMany = db.transaction((boards) => {
            for (const board of boards) {
                insert.run(board.title);
            }
        });

        insertMany(boardData);
        console.log("🌱 boards inserted");
    }
}

function seedTodoLists() {
    const todoListCount = db
        .prepare("SELECT COUNT(*) as count FROM todoList")
        .get();

    if (todoListCount.count > 0) {
        console.log("✅ todoList already seeded");
    }
    else {

        const insert = db.prepare(`
    INSERT INTO todoList (title, boardId , sortOrder)
    VALUES (?, ? , ?)
  `);

        const insertMany = db.transaction((todoLists) => {
            for (const todoList of todoLists) {
                insert.run(todoList.title, todoList.boardId , todoList.sortOrder);
            }
        });

        insertMany(todoListData);
        console.log("🌱 todoList inserted");
    }
}
function seedTodoCards() {
    const todoCardsCount = db
        .prepare("SELECT COUNT(*) as count FROM todoCard")
        .get();

    if (todoCardsCount.count > 0) {
        console.log("✅ todoCard already seeded");
    }
    else {

        const insert = db.prepare(`
            INSERT INTO todoCard (title, todoListId)
            VALUES (?, ?)
        `);

        const insertMany = db.transaction((todoCards) => {
            for (const todoCard of todoCards) {
                insert.run(todoCard.title, todoCard.todoListId);
            }
        });

        insertMany(todoCardData);
        console.log("🌱 todoList inserted");
    }
}
