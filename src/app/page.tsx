import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kid's Todo App - Home",
  description: "A fun todo app for kids to track their tasks and activities",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-10 backdrop-blur-sm bg-white/90">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-3">
            Kid&apos;s Todo Adventure
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>

          <Image
            className="mb-8"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />

          <p className="text-xl text-center text-gray-600 max-w-lg mb-8">
            A fun and colorful task manager designed especially for kids to
            organize their activities!
          </p>

          <Link
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 text-lg transition-all transform hover:scale-105 active:scale-95 shadow-md"
            href="/todo"
          >
            Start Your Todo Adventure!
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-indigo-50 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-indigo-700 mb-3">
              Easy to Use
            </h2>
            <p className="text-gray-600">
              Simple and intuitive interface designed for kids of all ages.
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-purple-700 mb-3">
              Fun Rewards
            </h2>
            <p className="text-gray-600">
              Get rewarded with animations and celebrations when tasks are
              completed!
            </p>
          </div>
          <div className="bg-pink-50 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-pink-700 mb-3">
              Build Good Habits
            </h2>
            <p className="text-gray-600">
              Learn responsibility and task management in a fun, engaging way.
            </p>
          </div>
        </div>

        <footer className="text-center border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 mb-4">
            Made with ❤️ for awesome kids!
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/todo"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Try the App
            </Link>
            <a
              className="text-indigo-600 hover:text-indigo-800 font-medium"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Next.js
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
