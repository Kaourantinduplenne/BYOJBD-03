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

  return (
    <div className="p-4 space-y-4 w-[1123px] h-[794px] border-2 border-black overflow-auto">
      <h1 className="text-xl font-bold text-center">Rig JBD Builder with Rotating Arrows</h1>
      <button onClick={addArrow} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Blue Arrow</button>
      <div className="relative w-full h-[500px] border mt-4 bg-white">
        {arrows.map(a => (
          <Rnd key={a.id}
            size={{ width: a.w, height: a.h }}
            position={{ x: a.x, y: a.y }}
            onDragStop={(e, d) => updateArrow(a.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, pos) => {
              updateArrow(a.id, {
                w: parseInt(ref.style.width),
                h: parseInt(ref.style.height),
                ...pos
              });
            }}
            style={{
              position: 'absolute',
              overflow: 'visible'
            }}
          >
            <div
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
                justifyContent: 'center'
              }}
            >
              ↔
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={a.rotate}
              onChange={(e) => updateArrow(a.id, { rotate: parseInt(e.target.value) })}
              className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-24"
            />
          </Rnd>
        ))}
      </div>
    </div>
  );
}
