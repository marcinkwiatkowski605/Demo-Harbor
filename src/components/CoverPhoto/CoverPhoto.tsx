import './CoverPhoto.css';

type Props = {
  src?: string;
  alt?: string;
};

export function CoverPhoto({ src, alt = '' }: Props) {
  return (
    <div className="cover-photo">
      {src && <img className="cover-photo__img" src={src} alt={alt} />}
    </div>
  );
}
