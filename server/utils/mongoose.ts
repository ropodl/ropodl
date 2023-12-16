import { Types } from "mongoose";

export const isValidObjectId = (id: String) => Types.ObjectId.isValid(id);
