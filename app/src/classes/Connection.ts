import mysql from "mysql";

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

  public start(credentials: { [key: string]: string | number }): boolean {
    if (!credentials.user || !credentials.password) {
      throw new Error("Credencias de acesso não localizadas.");
    }

    const { user, password } = credentials;

    this.user = user as string;
    this.password = password as string;

    const connectionConfig: { [key: string]: string | number } = {
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

  public static getInstance(connectionConfig: { [key: string]: string | number }) {
    if (!connectionConfig.host || !connectionConfig.port || !connectionConfig.database) {
      throw new Error("Configurações de conexão não localizadas.");
    }

    const { host, port, database } = connectionConfig;

    return new Connection(host as string, port as number, database as string);
  }

  public close() {
    this.connection.end((error) => {
      if (error) {
        console.log(`Erro ao tentar encerrar a conexão: ${error.stack}`);
      }
    });
  }
}
