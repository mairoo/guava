'use client'

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import className from "classnames";
import React, { ComponentPropsWithoutRef, Fragment, ReactNode } from "react";

import { MdOutlineMenu } from "react-icons/md";
import Button from "./Button";

interface DrawerProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  buttonColor?: string;
  buttonBackgroundColor?: string;
  modalBackgroundColor?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Drawer = ({
  children,
  buttonColor = "text-black",
  buttonBackgroundColor = "bg-white",
  modalBackgroundColor = "bg-white",
  isOpen,
  onOpen,
  onClose,
}: DrawerProps) => {
  return (
    <>
      {/* FAB 버튼 */}
      <Button
        onClick={onOpen}
        className={className(
          "text-2xl w-14 h-14 inline-flex justify-center items-center shadow-lg",
          buttonColor,
          buttonBackgroundColor,
        )}
        rounded="full"
      >
        <MdOutlineMenu />
      </Button>
      {/* 트랜지션 효과 2개를 감쌀 것 */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={onClose}>
          {/* 백드롭 오버레이: 트랜지션 효과 - ease-in-out(천천히 나타났다 사라짐) */}
          {/* position: fixed - modal, sticky header, sticky footer */}
          {/* 백드롭 터치 시 모달 사라짐 */}
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </TransitionChild>
          {/* 실제 서랍 메뉴: 트랜지션 효과 - transition (좌에서 우로 슬라이드) */}
          {/* https://headlessui.com/react/transition#co-ordinating-multiple-transitions */}
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-100"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-100"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {/* 모달 기능 속성 */}
            {/* fixed & inset-0 (top:0; right:0; bottom:0; left: 0) */}
            {/* overflow: hidden: 스크롤 허용 안 함 */}
            {/* pointer-events: none - action, hover 등 커서 옵션들 비활성화 */}
            {/* pr-32: 우측 여백으로 백드롭 터치 시 모달 서랍 사라지기 가능 */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none pr-32">
              {/* 모달 내용 속성 */}
              <DialogPanel
                className={className(
                  "flex flex-col h-screen overflow-y-scroll pointer-events-auto shadow-xl",
                  modalBackgroundColor,
                )}
              >
                {children}
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

export default Drawer;
