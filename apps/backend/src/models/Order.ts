import mongoose, {HydratedDocument, InferSchemaType} from 'mongoose';
import { address } from './schemas/address';
import {OrderStatusEnum} from "../enums/OrderStatusEnum";
import {PaymentMethodEnum} from "../enums/PaymentMethodEnum";
import {ShippingFeeEnum} from "../enums/ShippingFeeEnum";

const orderItemSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        size: { type: String, default: null },
        price: { type: Number, default: null },
        name: { type: String, default: null },
    },
    { _id: false },
);

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [orderItemSchema],
        total: { type: Number, default: 0 },
        status: {
            type: String,
            enum: Object.values(OrderStatusEnum),
            default: OrderStatusEnum.CART,
        },
        shipping: {
            method: { type: String, enum: Object.values(ShippingFeeEnum), default: ShippingFeeEnum.FIXED },
            cost: { type: Number, default: 0 },
            address,
            trackingNumber: { type: String, default: null },
        },
        payment: {
            method: { type: String, enum: Object.values(PaymentMethodEnum), default: null },
            transactionId: { type: String, default: null },
        },
        emailsSent: {
            confirmation: { type: Boolean, default: false },
            tracking: { type: Boolean, default: false },
        },
    },
    { timestamps: true },
);

orderSchema.index(
    { userId: 1, status: 1 },
    { unique: true, partialFilterExpression: { status: OrderStatusEnum.CART } },
);
orderSchema.index({ userId: 1, createdAt: -1 });

export type IOrder = HydratedDocument<InferSchemaType<typeof orderSchema>>;
export const Order = mongoose.model('Order', orderSchema);