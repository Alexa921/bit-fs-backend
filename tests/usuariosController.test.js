import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/modelos/usuariosModel.js", () => ({
  usuariosModel: {
    Registrar: jest.fn((post, callback) => callback({ state: true })),
    Existe: jest.fn((post, callback) => callback([])),
    ListarTodos: jest.fn((filtro, callback) => callback(null, [])),
    ListarUnico: jest.fn((post, callback) => callback({})),
    Actualizar: jest.fn((post, callback) => callback({ state: true })),
    Borrar: jest.fn((post, callback) => callback({ state: true })),
    Login: jest.fn((post, callback) =>
      callback([{ estado: "Active", nombre: "Test User" }])
    ),
    Activar: jest.fn((post, callback) => callback({ state: true })),
  }
}));

const { default: usuariosController } = await import("../src/controladores/usuarios.js");
const { usuariosModel } = await import("../src/modelos/usuariosModel.js");

describe("Controlador de Usuarios", () => {
  let request, response;

  beforeEach(() => {
    request = { body: {}, query: {}, params: {} };
    response = { json: jest.fn() };
  });

  describe("ListarTodos", () => {
    test("Debería retornar lista de usuarios", (done) => {
      response.json = jest.fn(() => {
        expect(response.json).toHaveBeenCalled();
        done();
      });

      usuariosController.ListarTodos(request, response);
    });
  });

  describe("ListarUnico", () => {
    test("Debería buscar usuario por email", (done) => {
      request.body = { email: "test@test.com" };
      response.json = jest.fn(() => {
        expect(response.json).toHaveBeenCalled();
        done();
      });

      usuariosController.ListarUnico(request, response);
    });
  });

  describe("Borrar", () => {
    test("Debería borrar con email válido", (done) => {
      request.query = { email: "test@test.com" };
      response.json = jest.fn(() => {
        expect(response.json).toHaveBeenCalled();
        done();
      });

      usuariosController.Borrar(request, response);
    });
  });

  describe("Login", () => {
    test("Debería hacer login con credenciales válidas", (done) => {
      request.body = { email: "test@test.com", password: "123" };
      response.json = jest.fn(() => {
        expect(response.json).toHaveBeenCalled();
        done();
      });

      usuariosController.Login(request, response);
    });

    test("Debería fallar con cuenta inactiva", (done) => {
      usuariosModel.Login.mockImplementationOnce((post, callback) =>
        callback([{ estado: "Inactive", nombre: "Test User" }])
      );

      request.body = { email: "test@test.com", password: "123" };
      response.json = jest.fn((data) => {
        expect(data).toEqual({
          state: false,
          mensaje: "Tu cuenta esta inactiva, vea al correo para activarla",
        });
        done();
      });

      usuariosController.Login(request, response);
    });
  });

  describe("Activar", () => {
    test("Debería activar con datos válidos", (done) => {
      request.params = { email: "test@test.com", codigo: "G-12345" };
      response.json = jest.fn(() => {
        expect(response.json).toHaveBeenCalled();
        done();
      });

      usuariosController.Activar(request, response);
    });
  });

});
