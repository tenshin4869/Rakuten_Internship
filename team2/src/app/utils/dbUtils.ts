import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc as firestoreDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// 各インターフェース
export interface Login_Data {
  ID: string;
  Pw: string;
}

export interface Users_Data {
  UID: string;
  Name: string;
  Email: string;
  Profile: string;
}

export interface Groups_Data {
  Name: string;
  Owner: string;
  Password: string;
}

export interface Member_Data {
  GID: string;
  UID: string;
  Role: string;
}

export interface Users_Origin {
  ID: string;
  Pw: string;
  Name: string;
  Email: string;
  Profile: string;
}

// ログインデータの追加
export const add_login_data = async (data: Login_Data): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "Logins"), data);
    console.log("Register login information successfully. ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Failed to register login information.", error);
    return "Fail";
  }
};

// ログインデータのチェック
export const check_login_data = async (data: Login_Data): Promise<string> => {
  try {
    const usersCollection = collection(db, "Logins");
    const q = query(usersCollection, where("ID", "==", data.ID));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      for (const loginDoc of querySnapshot.docs) {
        const docdata = loginDoc.data();
        if (docdata.Pw === data.Pw) {
          return loginDoc.id;
        }
      }
    } else {
      console.log("No matching documents.");
      return "";
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    return "";
  }
  return "";
};

// ユーザーデータの取得
export const get_user_data = async (UID: string) => {
  const docRef = firestoreDoc(db, "Users", UID);
  const _doc = await getDoc(docRef);
  if (_doc.exists()) {
    return _doc.data();
  } else {
    console.log("No such document!");
  }
};

// ユーザーデータの追加
export const add_user_data = async (userData: Users_Data) => {
  try {
    const user = {
      Name: userData.Name,
      Email: userData.Email,
      Profile: userData.Profile,
    };
    await setDoc(firestoreDoc(db, "Users", userData.UID), user);
  } catch (error) {
    console.error("Failed to register user information.", error);
  }
};

// グループデータの追加
export const add_group_data = async (
  groupData: Groups_Data
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "Groups"), groupData);
    console.log("Register group information successfully. ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Failed to register group information.", error);
    return "";
  }
};

// ユーザーをグループに追加
export const add_user_to_group = async (data: Member_Data) => {
  try {
    const docRef = await addDoc(collection(db, "Group_Memberships"), data);
    console.log("Add user to group successfully. ID:", docRef.id);
  } catch (error) {
    console.error("Failed to add user to group.", error);
  }
};

// グループデータの取得
export const get_group_data = async (GID: string) => {
  const docRef = firestoreDoc(db, "Groups", GID);
  const _doc = await getDoc(docRef);
  if (_doc.exists()) {
    return _doc.data();
  } else {
    console.log("No such document!");
  }
};

// グループメンバーの取得
export const get_group_members = async (GID: string) => {
  const membershipsCollection = collection(db, "Group_Memberships");
  const q = query(membershipsCollection, where("GID", "==", GID));
  const querySnapshot = await getDocs(q);
  const members = [];

  if (!querySnapshot.empty) {
    for (const membershipDoc of querySnapshot.docs) {
      const memberData = membershipDoc.data();
      const userRef = firestoreDoc(db, "Users", memberData.UID);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        members.push({
          UID: memberData.UID,
          Name: userData?.Name || "Unknown",
          Role: memberData.Role,
        });
      }
    }
  } else {
    console.log("No matching documents.");
  }

  return members;
};

// 全グループの表示
export const show_all_groups = async () => {
  const groupsCollection = collection(db, "Groups");
  const querySnapshot = await getDocs(groupsCollection);
  const groups = [];
  if (!querySnapshot.empty) {
    for (const groupDoc of querySnapshot.docs) {
      const docdata = groupDoc.data();
      const ownerDoc = await getDoc(firestoreDoc(db, "Users", docdata.Owner));
      const ownerName = ownerDoc.exists() ? ownerDoc.data().Name : "Unknown";
      groups.push({
        GID: groupDoc.id,
        Name: docdata.Name,
        OwnerName: ownerName,
      });
    }
  } else {
    console.log("No matching documents.");
  }
  return groups;
};

// ユーザーが登録したグッズを取得
export const get_user_goods = async (UID: string) => {
  const goodsCollection = collection(db, "Users", UID, "Products");
  const querySnapshot = await getDocs(goodsCollection);
  const goods = [];

  if (!querySnapshot.empty) {
    for (const goodDoc of querySnapshot.docs) {
      goods.push({
        id: goodDoc.id,
        ...goodDoc.data(),
      });
    }
  } else {
    console.log("No goods found for this user.");
  }

  return goods;
};

// グループのパスワードを確認
export const check_group_password = async (
  GID: string,
  inputPassword: string
): Promise<boolean> => {
  const docRef = firestoreDoc(db, "Groups", GID);
  const _doc = await getDoc(docRef);
  if (_doc.exists()) {
    const groupData = _doc.data();
    if (groupData?.Password === inputPassword) {
      return true;
    }
  }
  return false;
};

// ユーザーが既にグループに参加しているか確認
export const is_user_in_group = async (
  GID: string,
  UID: string
): Promise<boolean> => {
  const membershipsCollection = collection(db, "Group_Memberships");
  const q = query(
    membershipsCollection,
    where("GID", "==", GID),
    where("UID", "==", UID)
  );
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
};

// get all genre data
export const get_genre_data = async () => {
  const genreCollection = collection(db, "Genre");
  const querySnapshot = await getDocs(genreCollection);
  const genres = [];
  if (!querySnapshot.empty) {
    for (const doc of querySnapshot.docs) {
      const docdata = doc.data();
      genres.push(docdata.Name);
    }
  } else {
    console.log("No matching documents.");
  }
  return genres;
};
