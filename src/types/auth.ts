export namespace Auth {
  /**
   * 로그인 요청 시 필요한 데이터 타입
   * @property email - 사용자 이메일
   * @property password - 사용자 비밀번호
   * @property rememberMe - 자동 로그인 활성화 여부
   */
  export interface LoginRequest {
    email: string;
    password: string;
    rememberMe: boolean;
  }

  /**
   * 회원가입 요청 시 필요한 데이터 타입
   * @property email - 사용자 이메일
   * @property password - 사용자 비밀번호
   * @property passwordConfirm - 비밀번호 확인
   * @property nickname - 사용자 닉네임
   * @property lastName - 사용자 성
   * @property firstName - 사용자 이름
   */
  export interface SignUpRequest {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    lastName: string;
    firstName: string;
  }

  /**
   * 로그인 성공 시 서버로부터 받는 응답 데이터 타입
   * @property status - HTTP 상태 코드
   * @property timestamp - 응답 시간
   * @property message - 응답 메시지
   * @property data - 실제 인증 데이터
   * @property data.accessToken - JWT 액세스 토큰
   * @property data.tokenType - 토큰 타입 (예: "Bearer")
   * @property data.expiresIn - 토큰 만료 시간 (초)
   */
  export interface LoginResponse {
    status: number;
    timestamp: string;
    message: string;
    data: {
      accessToken: string;
      tokenType: string;
      expiresIn: number;
    };
  }

  /**
   * 로그아웃 응답 데이터 타입
   * 사용자 기본 정보를 포함
   * @property username - 사용자명
   * @property email - 사용자 이메일
   * @property password - 사용자 비밀번호
   */
  export interface LogoutResponse {
    username: string;
    email: string;
    password: string;
  }

  /**
   * Redux store에서 관리하는 인증 관련 상태 타입
   */
  export namespace State {
    /**
     * 인증 상태 인터페이스
     * @property accessToken - JWT 액세스 토큰 (로그아웃 시 null)
     * @property tokenType - 토큰 타입 (로그아웃 시 null)
     * @property expiresIn - 토큰 만료 시간 (로그아웃 시 null)
     * @property isLoading - 인증 처리 중 여부
     */
    export interface AuthState {
      accessToken: string | null;
      tokenType: string | null;
      expiresIn: number | null;
      isLoading: boolean;
    }
  }
}
