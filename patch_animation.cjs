const fs = require('fs');
let code = fs.readFileSync('src/components/LandingCover.tsx', 'utf8');

// Add mouse state
code = code.replace(
  `const [currentTime, setCurrentTime] = useState(new Date());`,
  `const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });`
);

// Add mouse handler to the root div, remove background from style
code = code.replace(
  /<div \n      ref=\{myRef\} \n      style=\{\{ transitionDuration: '800ms', backgroundImage: 'url\(\/tech_bg.jpg\)', backgroundSize: 'cover', backgroundPosition: 'center' \}\}\n      className=\{\`fixed inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center z-\[9999\] transition-all duration-800 ease-in-out \$\{/,
  `<div 
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        setMousePos({ x, y });
      }}
      style={{ transitionDuration: '800ms' }}
      className={\`fixed inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center z-[9999] bg-[#0a0e17] transition-all duration-800 ease-in-out \${`
);

// Insert background image div, Vanta container, and style tag
code = code.replace(
  /      {1,2}\/\* Header \*\//,
  `      <style>
        {\`
          @keyframes slowPan {
            0% { transform: scale(1.05) translate(0px, 0px); }
            50% { transform: scale(1.1) translate(-10px, -10px); }
            100% { transform: scale(1.05) translate(0px, 0px); }
          }
        \`}
      </style>
      
      {/* Animated Background Image */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
        style={{ 
          backgroundImage: 'url(/tech_bg.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          animation: 'slowPan 20s ease-in-out infinite',
          transform: \`scale(1.05) translate(\${-mousePos.x}px, \${-mousePos.y}px)\`
        }}
      />
      
      {/* Vanta Canvas */}
      <div ref={myRef} className="absolute inset-0 z-[1] pointer-events-none" />

      {/* Header */}`
);

// Update z-indexes of remaining absolute elements
code = code.replace(/z-\[2\]/g, 'z-[3]');
code = code.replace(/z-\[1\]/g, 'z-[2]');

fs.writeFileSync('src/components/LandingCover.tsx', code);
console.log("Patched LandingCover animation");
