export default function Button({ children, variant, className = "", ...props }) {
  const baseClass = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-800 focus:ring-blue-500",
    outline: "border border-gray-300 hover:bg-gray-100 focus:ring-gray-300",
  };

  const appliedClass = variant ? variants[variant] : variants.default;

  return (
    <button className={`${baseClass} ${appliedClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
