function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <span className="text-xl font-bold text-white tracking-tight">
        StyleStore
      </span>
    </a>
  );
}

export default Logo;
