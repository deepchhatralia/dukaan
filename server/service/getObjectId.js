import { ObjectId } from "mongodb";

const getObjectId = (id) => {
  return new ObjectId(id);
};

export default getObjectId;
