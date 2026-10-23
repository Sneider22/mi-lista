// Cuentas guardadas en el navegador (localStorage).
// Las contraseñas no se guardan tal cual: se guarda un hash SHA-256 con una "sal" aleatoria por usuario,
// así que mirando el localStorage no se puede leer la contraseña.
//
// Formato de 'usuarios': { [nombre]: { salt, hash } }
// Las cuentas de versiones anteriores guardaban la contraseña como texto; se convierten al iniciar sesión.

const USERS_KEY = 'usuarios';

export const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

const toHex = (buffer) => Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, '0')).join('');

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  return toHex(await crypto.subtle.digest('SHA-256', data));
}

function newSalt() {
  return toHex(crypto.getRandomValues(new Uint8Array(16)));
}

export async function registerUser(username, password) {
  const users = getUsers();
  if (users[username]) return { ok: false, error: 'El usuario ya existe' };
  const salt = newSalt();
  users[username] = { salt, hash: await hashPassword(password, salt) };
  saveUsers(users);
  return { ok: true };
}

export async function verifyUser(username, password) {
  const users = getUsers();
  const stored = users[username];
  if (!stored) return false;

  // Cuenta antigua con la contraseña en texto: se comprueba y se pasa a hash
  if (typeof stored === 'string') {
    if (stored !== password) return false;
    const salt = newSalt();
    users[username] = { salt, hash: await hashPassword(password, salt) };
    saveUsers(users);
    return true;
  }

  // Las cuentas de demostración no tienen contraseña
  if (!stored.hash) return false;
  return (await hashPassword(password, stored.salt)) === stored.hash;
}

export function isDemoAccount(username) {
  const stored = getUsers()[username];
  return Boolean(stored && typeof stored === 'object' && stored.demo);
}
