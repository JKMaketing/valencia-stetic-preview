// node:sqlite (DatabaseSync) sobre sql.js (SQLite en WebAssembly): API síncrona igual a la que usa la agenda.
let SQL = null;
export const usarSql = s => { SQL = s; };

class Sentencia {
  constructor(bd, sql) { this.bd = bd; this.sql = sql; }
  _filas(params) {
    const st = this.bd.prepare(this.sql);
    try { if (params.length) st.bind(params.map(v => (v === undefined ? null : v))); const filas = []; while (st.step()) filas.push(st.getAsObject()); return filas; }
    finally { st.free(); }
  }
  all(...params) { return this._filas(params); }
  get(...params) { return this._filas(params)[0]; }
  run(...params) {
    this.bd.run(this.sql, params.map(v => (v === undefined ? null : v)));
    const r = this.bd.exec('SELECT last_insert_rowid() AS id')[0];
    return { changes: this.bd.getRowsModified(), lastInsertRowid: r ? r.values[0][0] : 0 };
  }
}

export class DatabaseSync {
  constructor(_archivo) {
    if (!SQL) throw new Error('sql.js no está inicializado');
    const guardada = globalThis.__VS_DB_BYTES;
    this.bd = guardada ? new SQL.Database(guardada) : new SQL.Database();
    globalThis.__VS_DB_BYTES = null;
  }
  exec(sql) { this.bd.exec(sql); }
  prepare(sql) { return new Sentencia(this.bd, sql); }
  exportar() { return this.bd.export(); }
  close() { this.bd.close(); }
}
export default { DatabaseSync };
