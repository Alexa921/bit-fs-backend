import { jest } from "@jest/globals";
let ProductosController;
let ProductosModel;

jest.unstable_mockModule("../src/modelos/productos.js", () => ({
  default: {
    getAll: jest.fn(),
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
});

