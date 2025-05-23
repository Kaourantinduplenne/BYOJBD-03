'use client';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';

export default function RigJBDBuilder() {
  const [arrows, setArrows] = useState([]);
  const [arrowId, setArrowId] = useState(0);

  const addArrow = () => {
    const id = arrowId + 1;
    setArrows([...arrows, { id, x: 30, y: 30, w: 100, h: 10, rotate: 0 }]);
    setArrowId(id);
  };

  const updateArrow = (id, newData) => {
    setArrows(arrows.map(a => a.id === id ? { ...a, ...newData } : a));
  };

  const rotateArrow = (id) => {
    setArrows(arrows.map(a => a.id === id ? { ...a, rotate: (a.rotate + 30) % 360 } : a));
  };

  return (
    <div className="p-4 space-y-4 w-[1123px] h-[794px] border-2 border-black overflow-auto">
      <h1 className="text-xl font-bold text-center">Rig JBD Builder with Double-Click Arrow Rotation</h1>
      <button onClick={addArrow} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Blue Arrow</button>
      <div className="relative w-full h-[500px] border mt-4 bg-white">
        {arrows.map(a => (
          <Rnd key={a.id}
            size={{ width: a.w, height: a.h }}
            position={{ x: a.x, y: a.y }}
            onDragStop={(e, d) => updateArrow(a.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) =>
              updateArrow(a.id, { w: parseInt(ref.style.width), h: parseInt(ref.style.height), ...pos })}
            style={{
              position: 'absolute',
              overflow: 'visible'
            }}
          >
            <div
              onDoubleClick={() => rotateArrow(a.id)}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'blue',
                transform: `rotate(${a.rotate}deg)`,
                transformOrigin: 'center center',
                borderRadius: '4px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              ↻
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
