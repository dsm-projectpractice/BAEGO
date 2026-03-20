export default function TailwindTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
          TailwindCSS Test Page
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Colors</h3>
            <p className="text-gray-600">
              Beautiful gradient backgrounds and color combinations
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-500 rounded-full mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">📐</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Layout</h3>
            <p className="text-gray-600">
              Responsive grid system with flexbox utilities
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-500 rounded-full mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Effects</h3>
            <p className="text-gray-600">
              Smooth transitions and hover effects
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Components</h2>

          <div className="space-y-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
              Primary Button
            </button>

            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors duration-200 ml-4">
              Secondary Button
            </button>

            <button className="border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 ml-4">
              Outline Button
            </button>
          </div>

          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded"></div>
              <div className="w-8 h-8 bg-orange-500 rounded"></div>
              <div className="w-8 h-8 bg-yellow-500 rounded"></div>
              <div className="w-8 h-8 bg-green-500 rounded"></div>
              <div className="w-8 h-8 bg-blue-500 rounded"></div>
              <div className="w-8 h-8 bg-indigo-500 rounded"></div>
              <div className="w-8 h-8 bg-purple-500 rounded"></div>
              <div className="w-8 h-8 bg-pink-500 rounded"></div>
            </div>
            <p className="text-sm text-gray-600">Color palette showcase</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-4">Gradient Card</h2>
          <p className="text-lg opacity-90">
            TailwindCSS makes it easy to create beautiful gradient backgrounds and modern UI designs.
          </p>
          <div className="mt-6">
            <span className="inline-block bg-white text-purple-600 px-4 py-2 rounded-full font-semibold">
              Badge Example
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
