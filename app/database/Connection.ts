import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export class Connection {
  private connection: mysql.Connection;
  private user: string;
  private password: string;
  private host: string;
  private port: number;
  private database: string;

  private constructor(host: string, port: number, database: string) {
    this.connection = null;
    this.host = host;
    this.port = port;
    this.database = database;
  }

  public start(credentials?: { [key: string]: string | number }): boolean {
    let connectionConfig: { [key: string]: string | number };

    if (credentials) {
      if (!credentials.user || !credentials.password) {
        throw new Error("Credencias de acesso não localizadas.");
      }

      this.user = credentials.user as string;
      this.password = credentials.password as string;

      connectionConfig = {
        host: this.host,
        port: this.port,
        database: this.database,
        user: this.user,
        password: this.password,
      };
    } else {
      this.user = process.env.DB_USER;
      this.password = process.env.DB_PASS;

      connectionConfig = {
        host: this.host,
        port: this.port,
        database: this.database,
        user: this.user,
        password: this.password,
      };
    }

    this.connection = mysql.createConnection(connectionConfig);

    try {
      this.connection.connect();
      return true;
    } catch (error) {
      console.error("Erro ao conectar:", error);
      return false;
    }
  }

  public async *query(...queries: string[]): AsyncGenerator<any, void, unknown> {
    const queryPromises: Promise<any>[] = queries.map((query) => {
      return new Promise((resolve, reject) => {
        this.connection.query(query, (error, rows) => {
          if (error) {
            reject(
              new Error(`Erro ao executar a query ${query}. Por favor, reavalie as informações e tente novamente.`)
            );
          } else {
            resolve(rows);
          }
        });
      });
    });

    const querys = await Promise.all(queryPromises);

    for (const query of querys) yield query;
  }

  public static getInstance(connectionConfig?: { [key: string]: string | number }): Connection {
    if (connectionConfig) {
      if (!connectionConfig.host || !connectionConfig.port || !connectionConfig.database) {
        throw new Error("Configurações de conexão não localizadas.");
      }

      const { host, port, database } = connectionConfig;

      return new Connection(host as string, port as number, database as string);
    }

    return new Connection(process.env.DB_HOST, Number.parseInt(process.env.DB_PORT), process.env.DB_NAME);
  }

  public close() {
    this.connection.end((error) => {
      if (error) {
        console.log(`Erro ao tentar encerrar a conexão: ${error.stack}`);
      }
    });
  }
}
