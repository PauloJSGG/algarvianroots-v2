const Loading = () => {
  // Tailwind loading component
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="border-secondary h-32 w-32 animate-spin rounded-full border-t-2 border-b-2" />
    </div>
  );
};

export default Loading;
