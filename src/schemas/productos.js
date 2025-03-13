import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    imagen: { type: String, required: true },
    titulo: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: {
      type: String,
      required: true,
      enum: ["inicio", "novedades", "hombre", "mujer", "niño", "descuentos"],
      default: "novedades",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("novedades", productoSchema);