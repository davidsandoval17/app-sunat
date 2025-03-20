//@ts-check

import pLimit from "p-limit";

/**
 * // Example usage:
* let largeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
* let chunkSize = 3;

* let chunks = createChunks(largeArray, chunkSize);
* console.log(chunks);
 * @param {any[]} array 
 * @param {number} size 
 * @returns 
 */
function createChunks(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

const limit = pLimit(2);

// Función para procesar todos los chunks con p-limit
export async function processChunks(chunks, fn, totalItems) {
  const startTime = Date.now(); // Marca el inicio del procesamiento

  // Usamos `map` para crear las promesas pero controlamos la concurrencia
  const promises = chunks.map((chunk) => {
    // Cada chunk se procesa en paralelo, pero limitamos la cantidad de operaciones concurrentes
    return limit(() => Promise.all(chunk.map(fn)));
  });

  // Esperamos a que todas las promesas se resuelvan
  await Promise.all(promises);

  const endTime = Date.now(); // Marca el final del procesamiento
  const elapsedTime = (endTime - startTime) / 1000; // Tiempo en segundos

  // Convertir el tiempo en minutos y segundos
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = (elapsedTime % 60).toFixed(2);

  // Mostrar el tiempo de manera amigable
  console.log(
    `${totalItems} chunks processed in ${minutes} minutes and ${seconds} seconds.`
  );
}

export default createChunks;
