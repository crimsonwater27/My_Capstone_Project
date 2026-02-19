export default function Spinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      <p className="mt-3 text-sm text-gray-600">{text}</p>
    </div>
  );
}
