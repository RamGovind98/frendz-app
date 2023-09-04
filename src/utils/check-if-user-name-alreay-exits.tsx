import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../src/components/auth/firebase";

async function checkIfUserNameAlreadyExits(username: string): Promise<boolean> {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
}

export default checkIfUserNameAlreadyExits;
