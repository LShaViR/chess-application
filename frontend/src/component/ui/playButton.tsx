const PlayButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="w-40 bg-green-button hover:bg-green-button-hover text-white text-bold rounded-xl px-2 py-3 flex items-center transition-colors duration-200 shadow-lg  cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-4 relative"></div>
      <div className="text-xl font-bold">{children}</div>
    </button>
  );
};

export { PlayButton };
