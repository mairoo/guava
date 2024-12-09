import {auth} from '@/utils/auth';

/**
 * 로컬 스토리지를 관리하는 유틸리티 객체
 * 인증 관련 데이터와 일반적인 데이터의 저장, 조회, 삭제 기능 제공
 */
export const storage = {
  /**
   * 스토리지에서 사용하는 키 값들을 상수로 정의
   * as const를 사용하여 문자열 리터럴 타입으로 지정
   */
  keys: {
    rememberMe: 'rememberMe' as const,
    lastRefreshTime: 'lastRefreshTime' as const,
  },

  /**
   * 자동 로그인 설정 값을 가져오는 함수
   * @returns {boolean} 자동 로그인 활성화 여부
   */
  getRememberMe: (): boolean => {
    try {
      return localStorage.getItem(storage.keys.rememberMe) === 'true';
    } catch {
      return false; // localStorage 접근 실패 시 기본값으로 false 반환
    }
  },

  /**
   * 자동 로그인 설정을 저장하는 함수
   * @param value {boolean} 저장할 자동 로그인 설정 값
   */
  setRememberMe: (value: boolean): void => {
    try {
      localStorage.setItem(storage.keys.rememberMe, String(value));
    } catch (error) {
      console.error('Failed to save rememberMe to localStorage:', error);
    }
  },

  /**
   * 자동 로그인 설정을 삭제하는 함수
   */
  clearRememberMe: (): void => {
    try {
      localStorage.removeItem(storage.keys.rememberMe);
    } catch (error) {
      console.error('Failed to clear rememberMe from localStorage:', error);
    }
  },

  /**
   * 마지막 토큰 갱신 시간을 가져오는 함수
   * @returns {number | null} 마지막 갱신 시간 (timestamp) 또는 null
   */
  getLastRefreshTime: () => {
    return Number(localStorage.getItem(storage.keys.lastRefreshTime)) || null;
  },

  /**
   * 토큰 갱신 시간을 저장하는 함수
   * @param time {number} 저장할 시간 (timestamp)
   */
  setLastRefreshTime: (time: number) => {
    localStorage.setItem(storage.keys.lastRefreshTime, String(time));
  },

  /**
   * 토큰 갱신 시간을 삭제하는 함수
   */
  clearLastRefreshTime: () => {
    localStorage.removeItem(storage.keys.lastRefreshTime);
  },

  /**
   * 로컬 스토리지의 모든 데이터를 삭제하는 함수
   */
  clearAll: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },

  /**
   * 토큰이 만료 예정인지 확인하는 함수
   * - 인증 쿠키가 없거나
   * - 마지막 갱신 시간이 없거나
   * - 만료 10분 전인 경우 true 반환
   * @param expiresIn {number} 토큰 만료 시간 (초)
   * @returns {boolean} 토큰 갱신이 필요한지 여부
   */
  isTokenExpiring: (expiresIn: number): boolean => {
    // 인증 쿠키 존재 여부 확인
    if (!auth.isAuthenticated()) {
      return true;
    }

    // 마지막 갱신 시간 확인
    const lastRefresh = storage.getLastRefreshTime();
    if (!lastRefresh) return true;

    // 만료까지 남은 시간 계산
    const now = Date.now();
    const tokenExpiration = lastRefresh + expiresIn * 1000; // 초를 밀리초로 변환
    const timeUntilExpiration = tokenExpiration - now;

    // 만료 10분 전부터는 갱신 필요
    return timeUntilExpiration < 10 * 60 * 1000;
  },

  /**
   * 범용 데이터 조회 함수
   * @param key {string} 조회할 데이터의 키
   * @param defaultValue {T} 기본값
   * @returns {T} 저장된 값 또는 기본값
   */
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  /**
   * 범용 데이터 저장 함수
   * @param key {string} 저장할 데이터의 키
   * @param value {T} 저장할 값
   */
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error);
    }
  },

  /**
   * 범용 데이터 삭제 함수
   * @param key {string} 삭제할 데이터의 키
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove ${key} from localStorage:`, error);
    }
  },
};
