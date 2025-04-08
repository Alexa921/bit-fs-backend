import { jest } from "@jest/globals";
let ProductosController;
let ProductosModel;

jest.unstable_mockModule("../src/modelos/productos.js", () => ({
  default: {
    getAll: jest.fn(),
    getOne: jest.fn(),
    create: jest.fn(),
  },
}));

beforeAll(async () => {
  const mod = await import("../src/modelos/productos.js");
  ProductosModel = mod.default;

  const controllerMod = await import("../src/controladores/productos.js");
  ProductosController = controllerMod.default;
});

describe("Test de ProductosController", () => {
  let solicitud, respuesta;

  beforeEach(() => {
    solicitud = {
      body: {},
      query: {},
      params: {},
    };
    respuesta = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("debería obtener todos los productos", async () => {
    ProductosModel.getAll.mockResolvedValue([
      {
        _id: "1",
        titulo: "Zapatilla 1",
        imagen: "img1.jpg",
        precio: 100,
        categoria: "deportiva",
      },
    ]);

    await ProductosController.leerTodos(solicitud, respuesta);

    expect(respuesta.json).toHaveBeenCalledWith({
      mensaje: "se obtuvieron todos los productos",
      data: expect.arrayContaining([
        expect.objectContaining({
          titulo: "Zapatilla 1",
          imagen: "img1.jpg",
          precio: 100,
          categoria: "deportiva",
        }),
      ]),
    });
  });

  it("debería obtener un producto por ID", async () => {
    const productoId = "abc123";
    const productoMock = {
      _id: productoId,
      titulo: "Zapatilla única",
      imagen: "unica.jpg",
      precio: 150,
      categoria: "exclusiva",
    };

    solicitud.params.id = productoId;

    ProductosModel.getOne.mockResolvedValue(productoMock);

    await ProductosController.leerUno(solicitud, respuesta);

    expect(ProductosModel.getOne).toHaveBeenCalledWith(productoId);
    expect(respuesta.json).toHaveBeenCalledWith({
      mensaje: "se obtuvo el producto",
      data: productoMock,
    });
  });

  it("debería crear un nuevo producto", async () => {
    const productoNuevo = {
      titulo: "Zapatilla nueva",
      imagen: "nueva.jpg",
      precio: 200,
      categoria: "urbana",
    };

    solicitud.body = productoNuevo;

    ProductosModel.create.mockResolvedValue({
      _id: "xyz789",
      ...productoNuevo,
    });

    await ProductosController.crear(solicitud, respuesta);

    expect(ProductosModel.create).toHaveBeenCalledWith(productoNuevo);
    expect(respuesta.json).toHaveBeenCalledWith({
      mensaje: "se creó un nuevo producto",
      data: expect.objectContaining(productoNuevo),
    });
  });
});
