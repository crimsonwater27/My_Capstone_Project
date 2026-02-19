export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="text-center py-10">
      <p className="text-red-600 font-medium">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Try again
        </button>
      )}
    </div>
  );
}
