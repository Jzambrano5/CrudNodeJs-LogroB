import { ClienteModel } from '../models/Cliente.js';
import { CategoriaModel } from '../models/Categoria.js';

export const listarClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.findAll({
            include: CategoriaModel
        });
        const categorias = await CategoriaModel.findAll();
        const categoriaId = 'todos';  // O 'todos' para mostrar todas las categorías por defecto

        res.render('clienteList', { clientes, categorias, categoriaId });
    } catch (error) {
        res.status(500).send('Error al listar los clientes');
    }
};

export const mostrarFormularioCliente = async (req, res) => {
    try {
        const categorias = await CategoriaModel.findAll();
        if (req.params.id) {
            const cliente = await ClienteModel.findByPk(req.params.id);
            res.render('clienteForm', { cliente, categorias });
        } else {
            res.render('clienteForm', { cliente: null, categorias });
        }
    } catch (error) {
        res.status(500).send('Error al mostrar el formulario');
    }
};

export const guardarCliente = async (req, res) => {
    try {
        if (req.body.id) {
            await ClienteModel.update(req.body, { where: { id: req.body.id } });
        } else {
            await ClienteModel.create(req.body);
        }
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send('Error al guardar el cliente');
    }
};

export const eliminarCliente = async (req, res) => {
    try {
        await ClienteModel.destroy({ where: { id: req.params.id } });
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send('Error al eliminar el cliente');
    }
};
export const filtrarClientesPorCategoria = async (req, res) => {
    try {
        const categoriaId = req.query.categoriaId;

        let clientes;
        if (categoriaId === 'todos' || !categoriaId) {
            clientes = await ClienteModel.findAll({
                include: CategoriaModel
            });
        } else {
            clientes = await ClienteModel.findAll({
                where: { categoria_id: categoriaId },
                include: CategoriaModel
            });
        }

        const categorias = await CategoriaModel.findAll();
        
        res.render('clienteList', { clientes, categorias, categoriaId });
    } catch (error) {
        res.status(500).send('Error al filtrar los clientes por categoría');
    }
};


