import Todo from "../../components/Todo";

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-2">
              Kid&apos;s Todo App
            </h1>
            <p className="text-gray-600 text-center text-lg">
              Keep track of all your fun activities!
            </p>
          </div>

          <Todo />

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Made with ❤️ for awesome kids!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
