import {Application} from "./bin/app.js";

const config = {
    database: {
        file: "database.sdb"
    },
    server: {
        port: 3000
    }
}

const app = new Application(config);
app.start();

