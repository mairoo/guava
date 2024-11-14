import className from "classnames";
import React, { ReactNode } from "react";

type LayoutPosition = "center" | "top" | "top-sm" | "top-lg";
type Align = "left" | "center" | "right";

interface LayoutProps {
  children: ReactNode;
  position?: LayoutPosition;
  align?: Align;
  className?: string;
  width?: "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4";
}

const ContentLayout = ({
  children,
  position = "top",
  align = "left",
  className: additionalClassName = "",
  width = "1/2",
}: LayoutProps) => {
  const containerClasses = className(
    "flex flex-col",
    {
      "py-4 px-2 md:pt-12 md:px-0": position === "top-sm",
      "py-4 px-2 md:pt-32 md:px-0": position === "top",
      "py-4 px-2 md:pt-64 md:px-0": position === "top-lg",
      "justify-center min-h-screen": position === "center",
    },
    {
      "items-start": align === "left",
      "items-center": align === "center",
      "items-end": align === "right",
    },
  );

  const contentClasses = className(
    // 단순 width 컨트롤용 래퍼로만 사용하던 flex-col 제거
    // width 조절을 위한 래퍼로 필요하지만 justify-{start|center|end}는 현재 불필요
    // 이미 상위 컨테이너에서 items-{start|center|end}로 정렬이 처리되기 때문
    {
      "w-full": width === "full",
      "w-full md:w-1/2": width === "1/2",
      "w-full md:w-1/3": width === "1/3",
      "w-full md:w-2/3": width === "2/3",
      "w-full md:w-1/4": width === "1/4",
      "w-full md:w-3/4": width === "3/4",
    },
    {
      "justify-start": align === "left",
      "justify-center": align === "center",
      "justify-end": align === "right",
    },
    additionalClassName, // 외부에서 전달된 추가 클래스
  );

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>{children}</div>
    </div>
  );
};

export default ContentLayout;
