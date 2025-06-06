import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col p-2">
      <div className="flex h-2/3 flex-col justify-end rounded-lg bg-primary p-4">
        <h1 className="m-0 text-8xl font-bold text-lightGreen">Recicla</h1>
        <p className="ml-2 text-xl text-lightGreen">
          Sua plataforma de reciclagem
        </p>
      </div>
      <Link
            href="/login"
            className="flex items-center gap-5 mt-4 self-start rounded-lg bg-primary px-6 py-3 text-sm font-medium text-lightGreen transition-colors hover:bg-secondary md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
    </main>
  );
}
