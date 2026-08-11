/**
 * Genera el valor de ADMIN_PASSWORD_HASH.
 *
 *   npm run admin:password
 *
 * Pide la contraseña por stdin (no se escribe en el historial del shell ni en
 * ningún archivo) y devuelve la cadena que espera el Worker:
 *
 *   pbkdf2$<iteraciones>$<salt base64>$<hash base64>
 *
 * El formato y los parámetros son los mismos que verifica
 * `src/admin/auth.ts`: PBKDF2-SHA256, 32 bytes de salida. Si se cambian las
 * iteraciones aquí, no hace falta tocar el Worker: viajan dentro del hash.
 */

import { pbkdf2Sync, randomBytes } from "node:crypto";
import { createInterface } from "node:readline";

const ITERATIONS = 210_000;

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });

  // Sin eco: la contraseña no se ve al teclearla.
  const write = rl.output.write.bind(rl.output);
  let silent = false;
  rl.output.write = (chunk, ...rest) => (silent ? true : write(chunk, ...rest));

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.output.write = write;
      rl.output.write("\n");
      rl.close();
      resolve(answer);
    });
    silent = true;
  });
}

const password = await ask("Contraseña del panel: ");
if (password.length < 12) {
  console.error("\nDemasiado corta. Mínimo 12 caracteres: es la única puerta del panel.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, ITERATIONS, 32, "sha256");

console.log(`\npbkdf2$${ITERATIONS}$${salt.toString("base64")}$${hash.toString("base64")}\n`);
console.log("Guárdalo con:");
console.log("  npx wrangler secret put ADMIN_PASSWORD_HASH\n");
