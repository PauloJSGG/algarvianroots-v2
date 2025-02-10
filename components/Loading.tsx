const Loading = () => {
  // Tailwind loading component
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-secondary" />
    </div>
  );
};

export default Loading;
