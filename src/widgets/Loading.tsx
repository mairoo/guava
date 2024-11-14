import React from "react";

// 로딩 상태 타입 정의
interface LoadingProps {
  variant?: "spinner" | "dots" | "pulse" | "skeleton";
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const Loading = ({
  variant = "spinner",
  size = "md",
  text = "Loading...",
  fullScreen = false,
}: LoadingProps) => {
  // 사이즈별 클래스 매핑
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  // 기본 컨테이너 클래스
  const containerClasses = `
    flex flex-col items-center justify-center space-y-2
    ${fullScreen ? "fixed inset-0 bg-white bg-opacity-80 z-50" : "p-4"}
  `;

  // 텍스트 클래스
  const textClasses = `
    text-shade-3 
    ${size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"}
  `;

  // 스피너 변형
  const Spinner = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute w-full h-full border-4 border-natural-4 rounded-full" />
      <div className="absolute w-full h-full border-4 border-natural-2 rounded-full border-t-transparent animate-spin" />
    </div>
  );

  // 점 변형
  const Dots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`
            ${sizeClasses[size].split(" ")[0]?.replace("w-", "w-2")}
            ${sizeClasses[size].split(" ")[1]?.replace("h-", "h-2")}
            bg-natural-2 rounded-full
            animate-[bounce_1s_ease-in-out_infinite]
          `}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );

  // 펄스 변형
  const Pulse = () => (
    <div
      className={`
        ${sizeClasses[size]}
        bg-natural-2 rounded-full
        animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]
      `}
    />
  );

  // 스켈레톤 변형
  const Skeleton = () => (
    <div className="w-full max-w-sm">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-natural-4 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-natural-4 rounded" />
          <div className="h-4 bg-natural-4 rounded w-5/6" />
        </div>
      </div>
    </div>
  );

  // 변형별 컴포넌트 매핑
  const variants = {
    spinner: Spinner,
    dots: Dots,
    pulse: Pulse,
    skeleton: Skeleton,
  };

  const LoadingVariant = variants[variant];

  return (
    <div className={containerClasses}>
      <LoadingVariant />
      {text && variant !== "skeleton" && (
        <span className={textClasses}>{text}</span>
      )}
    </div>
  );
};

export default Loading;
