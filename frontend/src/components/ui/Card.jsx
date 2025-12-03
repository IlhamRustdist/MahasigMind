// src/components/ui/Card.jsx
export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white/90 shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
}
