import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './db/conexion.js';
import { clienteRouter } from './routes/ClienteRoutes.js';
import expressLayouts from 'express-ejs-layouts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('port',process.env.PORT||3000)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(clienteRouter);

const PORT = process.env.PORT || 3000;

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false });
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}/clientes`);
        });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

main();
 