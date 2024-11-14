'use client'

import {useLoginMutation} from '@/store/apis/authApi';
import {setCredentials} from '@/store/slices/authSlice';
import storage from '@/utils/storage';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

const SignInPage = () => {

    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
        captcha: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login(formData).unwrap();

            if (formData.rememberMe) {
                storage.setRememberMe(true);
            }

            if (response.status === 200) {
                dispatch(setCredentials(response));

                console.log('Logged in');
            } else {
                console.error('Login failed:', response.message);
            }
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                        placeholder="Password"
                        required
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => setFormData(prev => ({...prev, rememberMe: e.target.checked}))}
                    />
                    <label>Remember me</label>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default SignInPage