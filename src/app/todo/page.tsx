import Todo from "../../components/Todo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kid's Todo App",
  description: "A fun todo app for kids to track their tasks and activities",
};

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 backdrop-blur-sm bg-white/90">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-3">
              Kid&apos;s Todo App
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4"></div>
            <p className="text-gray-600 text-center text-lg max-w-md">
              Keep track of all your fun activities and achievements!
            </p>
          </div>

          <Todo />

          <div className="mt-10 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="inline-block text-rose-500">❤️</span>
              <p>Made with love for awesome kids!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
