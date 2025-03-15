import { useState, useRef } from "react";

export default function DraggableDiv({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!divRef.current) return;
    setIsDragging(true);
    setOffset({
      x: e.clientX - divRef.current.getBoundingClientRect().left,
      y: e.clientY - divRef.current.getBoundingClientRect().top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={divRef}
      className={className}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => isDragging && handleMouseMove(e.nativeEvent)}
    >
      {children}
    </div>
  );
}
