const fs = require('fs');
let code = fs.readFileSync('src/components/LandingCover.tsx', 'utf8');

code = code.replace(
  `      {/* Header */}`,
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

fs.writeFileSync('src/components/LandingCover.tsx', code);
console.log("Patched background image back in");
