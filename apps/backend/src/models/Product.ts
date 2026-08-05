import mongoose, { HydratedDocument, InferSchemaType, Model} from "mongoose";
import {ProductCategoryEnum} from "../enums/ProductCategoryEnum";
import {i18nString} from "./schemas/i18nString";

const productSchema = new mongoose.Schema(
    {
        name: i18nString,
        description: i18nString,
        category: {type: String, enum: ProductCategoryEnum, required: true},
        price: {type: Number, required: true, min: 0},
        images: {type: [String], required: true},
        size: {type: String},
        stock: {type: Number, default: 0, min: 0},
        active: {type: Boolean, default: false},
    },
    { timestamps: true }
)

productSchema.index({ category: 1, active: 1 })
productSchema.index({ price: 1 })

export type IProduct = HydratedDocument<InferSchemaType<typeof productSchema>>
export const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);