import { useState } from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore'; // Firestore imports
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Storage imports
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../components/auth/firebase';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { User } from 'firebase/auth';
import { toast } from 'react-toastify';

export function useUser(id: string) {
    const userDocRef = doc(db, 'users', id);
    const [user, isLoading] = useDocumentData<User>(userDocRef as any);
    return { user, isLoading } as any;
}

export function useUsers() {
    const usersCollectionRef = collection(db, 'users');
    const [users, isLoading] = useCollectionData<User>(usersCollectionRef as any);
    return { users, isLoading };
}

export function useUpdateAvatar(uid: string) {
    const [isLoading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    async function updateAvatar() {
        if (!file) {
            toast.error('Please select a file to upload');
            return;
        }

        setLoading(true);

        const fileRef = ref(storage, `avatars/${uid}`);
        await uploadBytes(fileRef, file);

        const avatarURL = await getDownloadURL(fileRef);

        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, { avatar: avatarURL });

        toast.success('Profile updated!');
        setLoading(false);

        navigate(0);
    }

    return {
        setFile,
        updateAvatar,
        isLoading,
        fileURL: file && URL.createObjectURL(file),
    };
}
