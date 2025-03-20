//@ts-check

import XLSX from "xlsx";
import fs from "fs";
import createChunks, { processChunks } from "./chucks.js";
import { scrap } from "./scrap.js";

const file = fs.readFileSync("files/claves.xlsx");

const book = XLSX.read(file, { type: "buffer" });

const sheet = book.Sheets[book.SheetNames[0]];

const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

const users = data.map((row) => ({
  name: row[0],
  ruc: row[1],
  user: row[2],
  password: row[3],
}));


if (users.length) {
  const chunks = createChunks(users, 2);
  const handlerUser = async (user) => {
    console.log(`Processing item:`, user.name);
    return scrap(user)
  };
  
  processChunks(chunks, handlerUser,users.length)
}
