"use client";

import "./globals.css";
import React from "react";
import Cursor from "./(cursor)/Cursor";
import { SplashScreen } from "./(ui)";
import { About, Home, Work } from "./(routes)";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-full w-max flex-col overflow-y-scroll bg-white text-red-500 dark:bg-black">
        <SplashScreen />
        {children}
        <Cursor />
        {/* pages */}
        <div className="pages">
          <div className="flex h-screen w-max flex-row flex-nowrap ">
            <Home />
            <About />
            <Work />
          </div>
          <div className="flex h-screen w-max flex-row flex-nowrap ">
            <About />
            <Home />
            <Work />
          </div>
          <div className="flex h-screen w-max flex-row flex-nowrap ">
            <Home />
            <About />
            <Work />
          </div>
        </div>
      </body>
    </html>
  );
}
