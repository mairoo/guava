'use client'

import {ChevronLeft, ChevronRight} from "lucide-react";
import React, {useState} from "react";

import {useSwipeable} from "react-swipeable";

interface Image {
    width: number;
    height: number;
    color: string;
}

interface SwipeSlideProps {
    images: Image[];
}

const SwipeSlide = ({images}: SwipeSlideProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        if (images.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };

    const prevSlide = () => {
        if (images.length > 0) {
            setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + images.length) % images.length,
            );
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,

        trackMouse: true,
    });

    if (images.length === 0) {
        return (
            <div className="w-full max-w-2xl mx-auto h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                이미지가 없습니다
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto" {...handlers}>
            <div className="overflow-hidden rounded-lg shadow-lg">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{transform: `translateX(-${currentIndex * 100}%)`}}
                >
                    {images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <img
                                src={`https://placehold.co/${image.width}x${image.height}/${image.color}/white`}
                                alt={`슬라이드 ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {images.length > 1 && (
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
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full focus:outline-none ${
                                        index === currentIndex
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

export default SwipeSlide;
