import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {IReadList} from "./readlist.interface";
import {ReadList} from "./readlist.model";

//add wishlist
export const addReadListService = async (payload: IReadList) => {
  const {user, book} = payload;
  const isExist = await ReadList.findOne({user, book});
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Already added this book to readlist!");
  }
  const newList = await ReadList.create(payload);
  if (!newList) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create list!");
  }
  return newList;
};
//get all lists
export const getAllReadListService = async (id: string): Promise<IReadList[]> => {
  const lists = await ReadList.find({user: id}).populate("user").populate("book");
  return lists;
};
//update list
export const updateReadListService = async (id: string, payload: Partial<IReadList>): Promise<IReadList | null> => {
  const isExist = await ReadList.findById({_id: id});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Read List not found!");
  }

  const result = await ReadList.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
