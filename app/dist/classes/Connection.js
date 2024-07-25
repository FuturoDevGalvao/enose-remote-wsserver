var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import mysql from "mysql";
export class Connection {
    constructor(host, port, database) {
        this.connection = null;
        this.host = host;
        this.port = port;
        this.database = database;
    }
    start(credentials) {
        if (!credentials.user || !credentials.password) {
            throw new Error("Credencias de acesso não localizadas.");
        }
        const { user, password } = credentials;
        this.user = user;
        this.password = password;
        const connectionConfig = {
            host: this.host,
            port: this.port,
            database: this.database,
            user: this.user,
            password: this.password,
        };
        this.connection = mysql.createConnection(connectionConfig);
        try {
            this.connection.connect();
            return true;
        }
        catch (error) {
            console.error("Erro ao conectar:", error);
            return false;
        }
    }
    query(...queries) {
        return __asyncGenerator(this, arguments, function* query_1() {
            const queryPromises = queries.map((query) => {
                return new Promise((resolve, reject) => {
                    this.connection.query(query, (error, rows) => {
                        if (error) {
                            reject(new Error(`Erro ao executar a query ${query}. Por favor, reavalie as informações e tente novamente.`));
                        }
                        else {
                            resolve(rows);
                        }
                    });
                });
            });
            const querys = yield __await(Promise.all(queryPromises));
            for (const query of querys)
                yield yield __await(query);
        });
    }
    static getInstance(connectionConfig) {
        if (!connectionConfig.host || !connectionConfig.port || !connectionConfig.database) {
            throw new Error("Configurações de conexão não localizadas.");
        }
        const { host, port, database } = connectionConfig;
        return new Connection(host, port, database);
    }
    close() {
        this.connection.end((error) => {
            if (error) {
                console.log(`Erro ao tentar encerrar a conexão: ${error.stack}`);
            }
        });
    }
}
