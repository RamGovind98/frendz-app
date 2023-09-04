import  { useState } from 'react';
import {  message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../components/auth/firebase';

interface AddCommentProps {
  postID: string;
  uid: string;
}

export function useAddComment({ postID, uid }: AddCommentProps) {
  const [isLoading, setLoading] = useState(false);

  async function addComment(text: string) {
    setLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, 'comments', id);
    await setDoc(docRef, { text, id, postID, date, uid });

    message.success('Comment added!', 5);
    setLoading(false);
  }

  return { addComment, isLoading };
}

export function useComments(postID: string) {
  const q = query(
    collection(db, 'comments'),
    where('postID', '==', postID),
    orderBy('date', 'asc')
  );
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) {
    throw error;
  }

  return { comments, isLoading };
}

export function useDeleteComment(id: string) {
  const [isLoading, setLoading] = useState(false);

  async function deleteComment() {
    const res = window.confirm('Are you sure you want to delete this comment?');

    if (res) {
      setLoading(true);
      const docRef = doc(db, 'comments', id);
      await deleteDoc(docRef);

      message.info('Comment deleted!', 5);
      setLoading(false);
    }
  }

  return { deleteComment, isLoading };
}
