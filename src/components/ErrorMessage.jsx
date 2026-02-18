export default function ErrorMessage({ message }) {
    return (
        <div className="text-center py-10 text-red-500">
            <p>{message}</p>
        </div>
    );
}