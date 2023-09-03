import {Schema, model} from "mongoose";
import {IReadList, ReadListModel} from "./readlist.interface";

const ReadListSchema = new Schema<IReadList, ReadListModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    book: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    status: {
      type: String,
      enum: ["Reading", "Plan to Read", "Finished"],
      default: "Plan to Read",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//create model
export const ReadList = model<IReadList, ReadListModel>("ReadList", ReadListSchema);
