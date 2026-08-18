import asset1 from '../assets/Asset 1.png';
import asset2 from '../assets/Asset 2.png';

export default function ClimberSilhouette({ pose = 'stepping', flip = false }) {
  const src = pose === 'armsUp' ? asset1 : asset2;
  return (
    <img
      src={src}
      width="200"
      alt=""
      aria-hidden="true"
      style={{ transform: flip ? 'scaleX(-1)' : undefined, display: 'block' }}
    />
  );
}
