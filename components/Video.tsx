type VideoProps = {
  desktop: {
    src: string;
    poster: string;
  };
  mobile: {
    src: string;
    poster: string;
  };
  className?: string;
};

export const Video = ({ desktop, mobile, className }: VideoProps) => {
  return (
    <div className={className}>
      <picture>
        <source media="(max-width: 640px)" srcSet={mobile.poster} />
        <source media="(min-width: 641px)" srcSet={desktop.poster} />
        <img
          src={desktop.poster}
          alt="Video poster"
          style={{ display: "none" }}
        />
      </picture>
      <video
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={desktop.poster}
      >
        <source
          key="mobile-mp4"
          src={mobile.src}
          type="video/mp4"
          media="(max-width: 640px)"
        />
        <source
          key="desktop-mp4"
          src={desktop.src}
          type="video/mp4"
          media="(min-width: 641px)"
        />
      </video>
    </div>
  );
};
