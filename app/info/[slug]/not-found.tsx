import Link from "next/link";

export default function InfoNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Content Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The information page you're looking for doesn't exist or hasn't been
            published yet.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Go Home
          </Link>

          <div className="text-sm text-gray-500">
            <p>Need help? This could mean:</p>
            <ul className="mt-2 space-y-1">
              <li>• The content hasn't been created in Builder.io yet</li>
              <li>• The URL structure has changed</li>
              <li>• The content is in draft mode</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
