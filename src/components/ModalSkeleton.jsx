export default function ModalSkeleton() {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-xl p-6 w-[90%] max-w-2xl animate-pulse space-y-4">
        
        <div className="h-6 bg-gray-700 rounded w-2/3"></div>
        
        <div className="h-64 bg-gray-800 rounded"></div>
        
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        
        <div className="h-10 bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
}