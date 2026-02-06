import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="relative min-h-screen py-8">
            <div>
                <div className="-z-100 absolute inset-0">
                    <Image
                        className="object-cover object-top h-full"
                        src={"/landing-page-background.jpg"}
                        alt="background-image"
                        fill
                    />
                </div>
                <div className="-z-100 absolute inset-0 bg-black/60"></div>
            </div>
            <div className="max-w-6xl text-white text-center sm:text-start px-8 pt-12 sm:pt-16 mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-0 xl:gap-16">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl leading-normal">
                        Düşünərək tanış ol. <p>Hiss edərək bağlan</p>
                    </h1>
                    <h2 className="text-lg">
                        Sakit, diqqətli və real əlaqələr üçün bir məkan. Və daha artığı
                    </h2>
                </div>
                <div>
                    <div className="px-12 xl:px-24 flex flex-col gap-8 items-center">
                        <svg
                            width="128"
                            height="128"
                            viewBox="0 0 146 146"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.04297 31.6909V23.4749C7.04297 19.1169 8.77418 14.9374 11.8558 11.8558C14.9373 8.77418 19.1169 7.04297 23.4749 7.04297H39.9068"
                                stroke="#F7AD00"
                                strokeWidth="14.0845"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.04297 113.85V122.066C7.04297 126.424 8.77418 130.603 11.8558 133.685C14.9373 136.766 19.1169 138.497 23.4749 138.497H39.9068"
                                stroke="#F7AD00"
                                strokeWidth="14.0845"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M105.635 7.04297H122.067C126.425 7.04297 130.604 8.77418 133.686 11.8558C136.767 14.9374 138.499 19.1169 138.499 23.4749V31.6909"
                                stroke="#F7AD00"
                                strokeWidth="14.0845"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M105.635 138.497H122.067C126.425 138.497 130.604 136.766 133.686 133.685C136.767 130.603 138.499 126.424 138.499 122.066V113.85"
                                stroke="#F7AD00"
                                strokeWidth="14.0845"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="text-3xl">
                            Bir <span className="text-[#FF0A0E]">addım</span>
                        </p>
                        <Link href="/auth/login">
                            <img
                                className="bg-white rounded-3xl sm:rounded-4xl w-56"
                                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                                alt="qr-code"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
