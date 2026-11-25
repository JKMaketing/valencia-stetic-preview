export const fileURLToPath = u => String(u).replace(/^file:\/\//, '');
export const pathToFileURL = p => ({ href: `file://${p}` });
export default { fileURLToPath, pathToFileURL };
