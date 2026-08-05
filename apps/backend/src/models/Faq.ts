import mongoose, { HydratedDocument, InferSchemaType} from "mongoose";
import {i18nString} from "./schemas/i18nString";

const faqSchema = new mongoose.Schema(
    {
        question: i18nString,
        answer: i18nString
    },
    { timestamps: true }
)

export type IFaq = HydratedDocument<InferSchemaType<typeof faqSchema>>
export const Faq = mongoose.model<IFaq>('Faq', faqSchema);