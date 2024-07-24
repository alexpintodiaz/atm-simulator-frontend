import { ButtonHTMLAttributes, forwardRef, useState} from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly text: string;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ text, className, ...props}, ref) => {

  const [opacity, setOpacity] = useState(0);

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <>
      <button
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative inline-flex h-10 min-w-24 items-center justify-center overflow-hidden rounded-md border border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950 px-2 font-medium text-gray-300 shadow-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 ${className}`}
        {...props}
      >
        <div
          className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
          style={{
            opacity,
            background: `radial-gradient(300px circle, rgba(255,255,255,.1), #0000000f)`,
          }}
        />
        {text}
      </button>
    </>
  );
});

