import {Auth} from '@/types/auth';
import {storage} from '@/utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/**
 * 인증 관련 상태의 초기값 정의
 * @property {string | null} accessToken - 액세스 토큰
 * @property {string | null} tokenType - 토큰 타입 (예: "Bearer")
 * @property {number | null} expiresIn - 토큰 만료 시간
 * @property {boolean} isLoading - 인증 처리 중 여부
 */
const initialState: Auth.State.AuthState = {
  accessToken: null,
  tokenType: null,
  expiresIn: null,
  isLoading: true, // 초기 인증 상태 확인 중에는 로딩 상태로 시작
};

/**
 * 인증 관련 Redux 슬라이스 생성
 * 인증 상태 관리를 위한 리듀서와 액션들을 정의
 */
export const authSlice = createSlice({
  name: 'auth', // 슬라이스의 고유 이름
  initialState,
  reducers: {
    /**
     * 로그인 성공 시 인증 정보를 저장하는 리듀서
     * @param state - 현재 상태
     * @param action - 로그인 응답 데이터를 페이로드로 포함하는 액션
     */
    setCredentials: (state, action: PayloadAction<Auth.SignInResponse>) => {
      state.accessToken = action.payload.data.accessToken;
      state.tokenType = action.payload.data.tokenType;
      state.expiresIn = action.payload.data.expiresIn;
    },

    /**
     * 인증 상태를 설정하는 리듀서
     * false로 설정 시 인증 정보를 초기화 (부분 로그아웃)
     * @param state - 현재 상태
     * @param action - boolean 값을 페이로드로 포함하는 액션
     */
    setAuth: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        state.accessToken = null;
        state.tokenType = null;
        state.expiresIn = null;
      }
    },

    /**
     * 로딩 상태를 설정하는 리듀서
     * 인증 처리 중임을 표시하기 위해 사용
     * @param state - 현재 상태
     * @param action - boolean 값을 페이로드로 포함하는 액션
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * 로그아웃 처리를 위한 리듀서
     * - 모든 인증 정보를 초기화
     * - 로컬 스토리지의 관련 데이터 삭제
     * @param state - 현재 상태
     */
    logout: (state) => {
      // Redux 상태 초기화
      state.accessToken = null;
      state.tokenType = null;
      state.expiresIn = null;

      // 로컬 스토리지 데이터 삭제
      storage.clearRememberMe(); // 자동 로그인 설정 제거
      storage.clearLastRefreshTime(); // 마지막 토큰 갱신 시간 제거
    },
  },
});

// 액션 생성자들을 외부로 내보내기
export const { setCredentials, setAuth, setLoading, logout } =
  authSlice.actions;

// 리듀서를 외부로 내보내기
export default authSlice.reducer;
