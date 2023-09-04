import { message } from 'antd';

import {
    getDownloadURL,
    listAll,
    ref,
} from "firebase/storage";
import {
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { useState } from 'react';
import {
    useCollectionData,
    useDocumentData,
} from 'react-firebase-hooks/firestore';
import { uuidv4 } from "@firebase/util";
import { db, storage } from '../components/auth/firebase';
import { useForm } from 'react-hook-form';

 

 
    

export function useAddPost() {
    const [isLoading, setLoading] = useState(false);
    const { reset, ...formMethods } = useForm<FormData>(); // Initialize the form with the correct type

    async function addPost(formData: FormData) { // Change the parameter name to 'formData'
        setLoading(true);
        const id = uuidv4();
        await setDoc(doc(db, 'posts', id), {
            ...formData, // Use 'formData' instead of 'post'
            id,
            date: Date.now(),
            likes: [],
            
        });
        message.success('Post added successfully!');
        setLoading(false);
        reset(); // Reset the form after submission
    }
    return { addPost, isLoading, formMethods };
}

    
export function useToggleLike({ id, isLiked, uid }: any) {
    const [isLoading, setLoading] = useState(false);

    async function toggleLike() {
        setLoading(true);
        const docRef = doc(db, 'posts', id);
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
        });
        setLoading(false);
    }

    return { toggleLike, isLoading };
}

export function useDeletePost(id: string) {
    const [isLoading, setLoading] = useState(false);

    async function deletePost() {
        const res = window.confirm('Are you sure you want to delete this post?');

        if (res) {
            setLoading(true);

            // Delete post document
            await deleteDoc(doc(db, 'posts', id));

            // Delete comments
            const q = query(collection(db, 'comments'), where('postID', '==', id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

            message.info('Post deleted!');
            setLoading(false);
        }
    }

    return { deletePost, isLoading };
}

export function usePost(id: string) {
    const q = doc(db, 'posts', id);
    const [post, isLoading] = useDocumentData(q);

    return { post, isLoading } as any;
}

export function usePosts(uid: string | null = null) {
    const q = uid
        ? query(
            collection(db, 'posts'),
            orderBy('date', 'desc'),
            where('uid', '==', uid)
        )
        : query(collection(db, 'posts'), orderBy('date', 'desc'));
    const [posts, isLoading, error] = useCollectionData(q);
    if (error) throw error;
    return { posts, isLoading };
}
export function useFiles(uid: string | null = null) {
    const data:any=[]
    listAll(ref(storage,'images')).then(img=>{
        img.items.forEach(val=>{
            getDownloadURL(val).then(url=>{
                data.push(url)
            })
        })
    })
    return data
}
