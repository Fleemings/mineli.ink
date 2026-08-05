import mongoose, {InferSchemaType, HydratedDocument} from "mongoose";
import {LanguageEnum} from "../enums/LanguageEnum";
import {PronounEnum} from "../enums/PronounEnum";
import {address} from "./schemas/address.js";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, default: null },
        googleId: { type: String, default: null },
        language: { type: String, enum: Object.values(LanguageEnum), default: LanguageEnum.PT, required: true },
        pronoun: { type: String, enum: Object.values(PronounEnum), default: null },
        address: { type: address, default: null },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

export type IUser = HydratedDocument<InferSchemaType<typeof userSchema>>;
export const User = mongoose.model('User', userSchema);