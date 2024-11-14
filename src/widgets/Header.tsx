import className from "classnames";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

interface HeaderProps extends ComponentPropsWithoutRef<"header"> {
  children?: ReactNode;
}

const Header = ({ children, ...rest }: HeaderProps) => {
  // ComponentPropsWithoutRef<태그> 타입으로 타입스크립트에서 HTML 요소를 상속 받는 컴포넌트를 재정의한다.
  // HTML 태그 요소의 className, style, onClick 같은 모든 `props`를 포함하지만 `ref`는 제외한다.
  // 이 타입으로 컴포넌트가 HTML 요소와 동일한 모든 `props`를 받을 수 있어 타입 안전성과 재사용을 높일 수 있다.
  // `rest`로 명시적으로 처리되지 않은 모든 `props`를 전달한다.
  // `children`과 `...rest` 사이에 사용자 정의 `props`를 선언할 수 있다.
  const classes = className(
    rest.className,
    "shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
  );

  return (
    <header {...rest} className={classes}>
      {children}
    </header>
  );
};

export default Header;
