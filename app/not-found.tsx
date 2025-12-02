'use client'

import Link from 'next/link';
import {ArrowLeft} from "lucide-react";
import React from "react";

export default function NotFound() {
    return (
        <div className="min-h-screen  text-5xl text-red-800 flex flex-col items-center justify-center w-full">
            <div className="flex flex-col">Not Found</div>
            <div className={'mt-5'}>
                <Link href={'/'} className="flex gap-4 items-center">
                    <ArrowLeft /> Back to Home
                </Link>
            </div>
        </div>
    );
}
