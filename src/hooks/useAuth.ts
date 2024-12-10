import {RootState} from '@/store';
import {useSelector} from 'react-redux';

/**
 * 사용자의 인증 상태를 관리하는 커스텀 훅
 * @returns {object} 인증 관련 상태값들을 포함한 객체
 * - isAuthenticated: 사용자가 로그인되어 있는지 여부
 * - isLoading: 인증 처리 중인지 여부
 * - accessToken: 현재 저장된 액세스 토큰
 */
export const useAuth = () => {
  // Redux store에서 인증 관련 상태들을 가져옴
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.accessToken !== null,
  );
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return { isAuthenticated, isLoading, accessToken };
};
