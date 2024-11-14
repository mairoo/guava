'use client'

import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild,} from "@headlessui/react";
import React, {Fragment} from "react";
import {IconType} from "react-icons";
import {MdError} from "react-icons/md";
import Button from "./Button";

interface ErrorModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
    title?: string;
    icon?: IconType;
    iconColor?: string;
    iconSize?: number;
}

const ErrorModal = ({
                        isOpen,
                        message,
                        onClose,
                        title = "오류", // 기본값 설정
                        icon: Icon = MdError, // 기본 아이콘
                        iconColor = "#EF4444", // 기본 색상 (red-500)
                        iconSize = 24, // 기본 크기
                    }: ErrorModalProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* 배경 오버레이 */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </TransitionChild>

                {/* 모달 컨텐츠 */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <Icon
                                            style={{
                                                color: iconColor,
                                                width: iconSize,
                                                height: iconSize,
                                            }}
                                        />
                                    </div>
                                    <DialogTitle
                                        as="h3"
                                        className="text-lg font-semibold leading-6 text-gray-900"
                                    >
                                        {title}
                                    </DialogTitle>
                                </div>

                                <div className="mt-3">
                                    <p className="text-sm text-gray-500">{message}</p>
                                </div>

                                <div className="mt-5">
                                    <Button
                                        preset="secondary"
                                        rounded="medium"
                                        size="large"
                                        fullWidth={true}
                                        onClick={onClose}
                                    >
                                        확인
                                    </Button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ErrorModal;
