import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();
const USERNAME = "postgres";
const PASSWORD = "1";
const HOST = "localhost";
const DATABASE = "Beauty_in_details";

const conStringPri = `postgres://${USERNAME}:${PASSWORD}@${HOST}/${DATABASE}`;
const Client = pg.Client;
const client = new Client({ connectionString: conStringPri });
client.connect();

export default client;

