import express from 'express';
import { listarClientes, mostrarFormularioCliente, guardarCliente, eliminarCliente ,filtrarClientesPorCategoria} from '../controllers/ClienteController.js';

const router = express.Router();

router.get('/clientes', listarClientes);
router.get('/filtrar', filtrarClientesPorCategoria);

router.get('/clientes/nuevo', mostrarFormularioCliente);
router.get('/clientes/editar/:id', mostrarFormularioCliente);
router.post('/clientes', guardarCliente);
router.post('/clientes/eliminar/:id', eliminarCliente);

export { router as clienteRouter };
