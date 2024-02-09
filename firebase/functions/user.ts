import { User_Type } from "@/models/type";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "..";

export const users_collection = "users";

export const usersRef = collection(db, users_collection);

export const setUser = async (user: User_Type) => {
  try {
    await setDoc(doc(usersRef, user.phone), user);
  } catch (error) {
    console.log(error);
  }
};

// usrs's id and phone are same
export const getUser = async (id: string) => {
  try {
    const user = await getDoc(doc(usersRef, id));

    return user.data() as User_Type;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const users = await getDocs(usersRef);

    return users.docs.map((user) => user.data() as User_Type);
  } catch (error) {
    console.log(error);
  }
};
