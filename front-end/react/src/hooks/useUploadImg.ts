import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../components/firebase";
import { v4 as uuidv4 } from "uuid";

export const UseUploadImage = async (imageUpload: any) => {
  if (imageUpload && imageUpload.name) {
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    await uploadBytes(imageRef, imageUpload);
    return getDownloadURL(imageRef);
  }
  return;
};
