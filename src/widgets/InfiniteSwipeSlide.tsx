'use client'

import {ChevronLeft, ChevronRight} from 'lucide-react';
import React, {useCallback, useEffect, useState} from "react";
import {useSwipeable} from "react-swipeable";

interface Image {
    width: number;
    height: number;
    color: string;
}

interface InfiniteSwipeSlideProps {
    images: Image[];
}

const InfiniteSwipeSlide = ({images}: InfiniteSwipeSlideProps) => {
    const [slides, setSlides] = useState<
        { width: number; height: number; color: string }[]
    >([]);
    const [currentIndex, setCurrentIndex] = useState(images.length > 1 ? 1 : 0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (images.length > 1) {
            // at() - 음수 인덱스 가능, 코드 가독성 향상
            // [] - 단순 인덱스 접근, 브라우저 호환성 중요, 성능 중요
            const firstSlide = images[0];
            const lastSlide = images[images.length - 1];

            if (firstSlide && lastSlide) {
                // 연속으로 넘어가는 효과를 주기 위해 복제
                // 마지막 슬라이드 + 슬라이드 전체 + 첫 슬라이드
                setSlides([lastSlide, ...images, firstSlide]);
            }
        } else {
            setSlides(images);
        }
    }, [images]);

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

    const nextSlide = useCallback(() => {
        goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

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

    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    if (slides.length === 0) {
        return (
            <div className="bg-danger-2 text-white text-center">
                이미지가 없습니다.
            </div>
        );
    }

    return (
        <div
            className="relative w-full max-w-2xl mx-auto overflow-hidden"
            {...handlers}
        >
            <div
                className={`flex ${isTransitioning ? "transition-transform duration-200 ease-in-out" : ""}`}
                style={{transform: `translateX(-${currentIndex * 100}%)`}}
            >
                {slides.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <img
                            src={`https://placehold.co/${image.width}x${image.height}/${image.color}/white`}
                            alt={`슬라이드 ${index}`}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
            </div>
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-800"/>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-800"/>
                    </button>
                    <div className="absolute bottom-4 left-0 right-0">
                        <div className="flex items-center justify-center space-x-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index + 1)}
                                    className={`w-3 h-3 rounded-full focus:outline-none ${
                                        index === (currentIndex - 1 + images.length) % images.length
                                            ? "bg-white"
                                            : "bg-white bg-opacity-50"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default InfiniteSwipeSlide;
