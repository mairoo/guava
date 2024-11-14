'use client';

import {LucideIcon} from 'lucide-react';
import React, {forwardRef} from "react";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: LucideIcon;
    type: "text" | "email" | "password";
    placeholder: string;
    className?: string;
}

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
    ({icon: Icon, type, placeholder, className = "", ...props}, ref) => (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400"/>
            </div>
            <input
                ref={ref}
                type={type}
                className={`w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
                placeholder={placeholder}
                {...props}
            />
        </div>
    ),
);

InputGroup.displayName = "InputGroup";

export default InputGroup;
