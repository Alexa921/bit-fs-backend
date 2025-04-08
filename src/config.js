export const config = {
  puerto: process.env.PUERTO || 3001,
  db: process.env.DB || "Backend",
  expiracion: process.env.EXPIRACION || 1000 * 60 * 60,
  secret: "mi_clave_secreta_para_tests",
};

config.listablanca = [
  "http://localhost:4200"
]
  