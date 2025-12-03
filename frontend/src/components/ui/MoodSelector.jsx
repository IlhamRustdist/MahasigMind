// src/components/ui/MoodSelector.jsx
const MOODS = ["😔", "😕", "😐", "🙂", "😊"];

export default function MoodSelector({ value, onChange }) {
  return (
    <div className="flex gap-2 justify-between">
      {MOODS.map((mood) => (
        <button
          key={mood}
          type="button"
          onClick={() => onChange?.(mood)}
          className="flex-1 py-2 rounded-xl bg-white/70 text-xl"
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
