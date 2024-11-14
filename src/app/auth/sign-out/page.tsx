'use client'

import {useLogoutMutation} from '@/store/apis/authApi';
import {logout} from '@/store/slices/authSlice';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

const SignOutPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [logoutMutation, {isLoading}] = useLogoutMutation();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await logoutMutation().unwrap();
                if (response.status === 200) {
                    dispatch(logout());
                    router.push('/auth/sign-in');
                } else {
                    console.error('Logout failed:', response.message);
                    router.push('/');
                }
            } catch (error) {
                console.error('Failed to logout:', error);
                router.push('/');
            }
        };

        handleLogout();
    }, [logoutMutation, dispatch, router]);

    return (
        <div>
            {isLoading ? 'Logging out...' : 'Redirecting...'}
        </div>
    );
};
export default SignOutPage