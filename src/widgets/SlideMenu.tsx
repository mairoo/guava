'use client'

import {Dot} from 'lucide-react';
import Link from "next/link";
import React, {useCallback, useEffect, useState} from "react";
import {useSwipeable} from "react-swipeable";

import DrawerHeading from "./DrawerHeading";

interface DrawerMenuItem {
    heading: string;
    items: { text: string; link: string; icon?: string }[];
}

interface SlideMenuProps {
    menu: DrawerMenuItem[];
    onClick: () => void;
}

const SlideMenu = ({menu, onClick}: SlideMenuProps) => {
    const [slides, setSlides] = useState<DrawerMenuItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(menu.length > 1 ? 1 : 0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // 메뉴 추가/삭제 변경 시 메뉴 구성 변경
    useEffect(() => {
        if (menu.length > 1) {
            // at() - 음수 인덱스 가능, 코드 가독성 향상
            // [] - 단순 인덱스 접근, 브라우저 호환성 중요, 성능 중요
            const firstSlide = menu[0];
            const lastSlide = menu[menu.length - 1];

            if (firstSlide && lastSlide) {
                // 연속으로 넘어가는 효과를 주기 위해 복제
                // 마지막 슬라이드 + 슬라이드 전체 + 첫 슬라이드
                setSlides([lastSlide, ...menu, firstSlide]);
            }
        } else {
            setSlides(menu);
        }
    }, [menu]);

    // 화면 이동 함수
    const goToSlide = useCallback(
        (index: number) => {
            if (slides.length > 1 && !isTransitioning) {
                // 화면전환 중에 재진입 불가
                setIsTransitioning(true);
                setCurrentIndex((_) => {
                    if (index < 0) return slides.length - 2;
                    if (index >= slides.length) return 1;
                    return index;
                });
            }
        },
        [slides.length, isTransitioning],
    );

    // 다음 슬라이드 함수
    const nextSlide = useCallback(() => {
        goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    // 이전 슬라이드 함수
    const prevSlide = useCallback(() => {
        goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    // 화면 전환 중 상태일 때에만 트랜지션 상태 종료 처리
    useEffect(() => {
        if (!isTransitioning) return;

        const timer = setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex((prevIndex) => {
                if (prevIndex === 0) return slides.length - 2;
                if (prevIndex === slides.length - 1) return 1;
                return prevIndex;
            });
        }, 200); // 트랜지션 `duration-xxx` 값과 일치해야 한다.

        return () => clearTimeout(timer);
    }, [currentIndex, isTransitioning, slides.length]);

    // 스와이프 이벤트 핸들러
    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        trackMouse: true,
    });

    if (slides.length === 0) {
        return (
            <div className="bg-danger-2 text-white text-center">메뉴가 없습니다.</div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden" {...handlers}>
            <div
                className={`flex ${isTransitioning ? "transition-transform duration-200 ease-in-out" : ""}`}
                style={{transform: `translateX(-${currentIndex * 100}%)`}}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        {/* 스크롤 가능하게 한 번 감싸줄 것 /*/}
                        <div className="flex flex-col h-[calc(100dvh_-_257px)] overflow-y-auto">
                            <DrawerHeading className="border-green-600 bg-natural-1 text-natural-5">
                                {slide.heading}
                            </DrawerHeading>
                            {slide.items.map((item, i) => (
                                <Link
                                    href={item.link}
                                    className="inline-flex gap-x-2 items-center px-3 py-1"
                                    onClick={onClick}
                                    key={i}
                                >
                                    <Dot />
                                    {item.text}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* 서랍 메뉴 바닥 탭 - indicators */}
            {slides.length > 1 && (
                <div className="bg-natural-1">
                    <div className="flex justify-around font-bold">
                        {menu.map((slide, index) => (
                            <div
                                key={index}
                                onClick={() => goToSlide(index + 1)}
                                className={`flex-1 text-center border-t-4 py-1 ${
                                    index === (currentIndex - 1 + menu.length) % menu.length
                                        ? "border-t-green-600 text-natural-5"
                                        : "border-t-gray-200 text-generic-gradient-3"
                                }`}
                            >
                                {slide.heading}
                            </div>
                        ))}
                    </div>

                    <div className="text-center text-sm text-generic-gradient-2 py-1">
                        &copy; Road2GM
                    </div>
                </div>
            )}
        </div>
    );
};

export default SlideMenu;
