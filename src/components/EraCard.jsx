export default function EraCard({ title, image }) {
  return (
    <div className="group cursor-pointer">
      <div
        className="h-64 bg-cover bg-center rounded-xl relative overflow-hidden"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />

        <h3 className="absolute bottom-6 left-6 text-yellow-300 italic text-xl">
          {title}
        </h3>
      </div>
    </div>
  );
}