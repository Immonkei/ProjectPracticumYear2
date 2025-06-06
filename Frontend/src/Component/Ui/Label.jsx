export default function Label({ children, className = "", ...props }) {
  return (
    <label className={`block text-sm font-semibold text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );
}
