'use client';

import React from "react";
import Image from "next/image";
import Simulation from "./simulation";

export default function Home() {
  const [poolSizePass, setPoolSizePass] = React.useState(0);
  const [poolSizeUSDT, setPoolSizeUSDT] = React.useState(0);
  const [benchmark, setBenchmark] = React.useState(0);
  const [priceMultiple, setPriceMultiple] = React.useState(0);
  const [priceOfPassTokens, setPriceOfPassTokens] = React.useState(0);

  const handlePoolSizePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoolSizePass(Number(e.target.value));
  };

  const handlePoolSizeUSDTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoolSizeUSDT(Number(e.target.value));
  };

  const handleBenchmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBenchmark(Number(e.target.value) / 100);
  };

  const handlePriceMultipleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceMultiple(Number(e.target.value));
  };

  React.useEffect(() => {
    setPriceOfPassTokens(poolSizeUSDT / poolSizePass);
  }, [poolSizePass, poolSizeUSDT]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm flex">
        <div className="fixed bottom-0 left-0 flex h-16 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black md:static md:h-auto md:w-auto md:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-4 md:pointer-events-auto md:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/passport_logo.jpg"
              alt="Passport Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
        
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit md:static md:w-auto  md:rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30">
          Get started by adding&nbsp;
          <code className="font-mono font-bold">pool size</code>
        </p>
      </div>
      <div className="relative flex flex-col items-center w-full">
        <div className="mb-4 grid grid-cols-1 gap-4 text-center md:grid-cols-2 md:text-left md:mb-8">
          <div>
            <label htmlFor="poolSizePass" className="font-bold mb-2 block">
              Pool size (Number of PASS Tokens)
            </label>
            <input
              type="number"
              id="poolSizePass"
              name="poolSizePass"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => handlePoolSizePassChange(e)}
            />
          </div>
          <div>
            <label htmlFor="poolSizeUSDT" className="font-bold mb-2 block">
              Pool size (Number of USDT Tokens)
            </label>
            <input
              type="number"
              id="poolSizeUSDT"
              name="poolSizeUSDT"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => handlePoolSizeUSDTChange(e)}
            />
          </div>
          <div>
            <label htmlFor="benchmark" className="font-bold mb-2 block">
              Benchmark
            </label>
            <input
              type="number"
              id="benchmark"
              name="benchmark"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => handleBenchmarkChange(e)}
            />
          </div>
          <div>
            <label htmlFor="priceMultiple" className="font-bold mb-2 block">
              Price Multiple
            </label>
            <input
              type="number"
              id="priceMultiple"
              name="priceMultiple"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => handlePriceMultipleChange(e)}
            />
          </div>
        </div>
        <div>
          <Simulation
            benchmark={benchmark}
            poolSizePass={poolSizePass}
            priceOfPassTokens={priceOfPassTokens}
            priceMultiple={priceMultiple}
            poolSizeUSDT={poolSizeUSDT}
          />{" "}
        </div>
      </div>
    </main>
  );
}
