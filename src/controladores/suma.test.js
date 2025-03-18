const sumar = require("./funciones").sumar;

test("sumar 2 + 3 debe dar 5", () => {
    expect(sumar(2, 3)).toBe(5);
});