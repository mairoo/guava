'use client';

import { useLoginMutation } from '@/store/auth/api';
import storage from '@/utils/storage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignInPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
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
        router.push('/dashboard');
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
          <label>이메일</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="이메일주소"
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="비밀번호"
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))
            }
          />
          <label>로그인 유지</label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <Link href="/">홈으로</Link>
      </form>
    </div>
  );
};

export default SignInPage;
