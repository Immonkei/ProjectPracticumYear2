export default function Checkbox(props) {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
      {...props}
    />
  );
}
