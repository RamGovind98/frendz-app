import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { FEED, LOGIN } from '../../routes/route';
import checkIfUserNameAlreadyExits from '../../utils/check-if-user-name-alreay-exits';
import { auth, db } from './firebase';
import { toast } from 'react-toastify';;

export interface User {
    id: string;
    username: string;
    avatar: string;
    date: number;
    followedUsers: string[]
}

export interface AuthUser {
    uid: string;
}

export function useAuth(): {
    user: User;
    isLoading: boolean;
    error: any;
} {
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            if (authUser) {
                const ref = doc(db, 'users', authUser.uid);
                const docSnap = await getDoc(ref);
                setUser(docSnap.data() as User);
            }
            setLoading(false);
        }

        if (!authLoading) {
            if (authUser) fetchData();
            else setLoading(false); // Not signed in
        }
    }, [authLoading, authUser]);

    return { user, isLoading, error } as any;
}

export function useLogin(): {
    login: (params: {
        email: string;
        password: string;
        redirectTo?: string;
    }) => Promise<void>;
    isLoading: boolean;
} {
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function login(params: {
        email: string;
        password: string;
        redirectTo?: string;
    }) {
        const { email, password, redirectTo = FEED } = params; // Destructure the params object here
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password).then(res => {
                // console.log(res.user?.refreshToken)
                localStorage.setItem('user', res.user?.refreshToken)
            });
            toast.success('You are logged in');

            navigate(redirectTo);
        } catch (error) {
            toast.error('Logging in failed');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return { login, isLoading };
}

export function useRegister(): {
    register: (params: {
        username: string;
        email: string;
        password: string;
        avatar: string
        followedUsers:string[]
        redirectTo?: string;
    }) => Promise<void>;
    isLoading: boolean;
} {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function register(params: {
        username: string;
        email: string;
        password: string;
        avatar: string
        followedUsers:string[],
        redirectTo?: string;
    }) {
        const { username, email, password, redirectTo = FEED } = params; // Destructure the params object here
        setLoading(true);

        const usernameExists = await checkIfUserNameAlreadyExits(username);

        if (usernameExists) {
            toast.warn('Username already exists');
            setLoading(false);
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);

                await setDoc(doc(db, 'users', res.user.uid), {
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    avatar: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
                    followedUsers:[''],
                    date: Date.now(),
                });

                toast.success('Account created');

                navigate(redirectTo);
            } catch (error) {
                toast.error('Signing Up failed');
            } finally {
                setLoading(false);
            }
        }
    }

    return { register, isLoading };
}

export function useLogout(): {
    logout: () => Promise<void>;
    isLoading: boolean;
} {
    const [signOut, isLoading] = useSignOut(auth);
    const navigate = useNavigate();

    async function logout() {
        if (await signOut()) {
            toast.success('Successfully logged out')
            navigate(LOGIN);
        } // else: show error [signOut() returns false if failed]
    }

    return { logout, isLoading };
}
