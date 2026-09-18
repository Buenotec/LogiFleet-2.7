const fs = require('fs');
let code = fs.readFileSync('src/components/LandingCover.tsx', 'utf8');

// Set background image and transparent vanta
code = code.replace(
  /backgroundColor: 0x0a0e17,/g,
  'backgroundColor: 0x0a0e17,\n            backgroundAlpha: 0.0,'
);

code = code.replace(
  /className={\`fixed inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center z-\[9999\] transition-all duration-800 ease-in-out \${/,
  'style={{ transitionDuration: \'800ms\', backgroundImage: \'url(/tech_bg.jpg)\', backgroundSize: \'cover\', backgroundPosition: \'center\' }}\n      className={`fixed inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center z-[9999] transition-all duration-800 ease-in-out ${'
);

code = code.replace(
  /style={{ transitionDuration: '800ms' }}\n    >/,
  '    >'
);

// Tweak the overlay so we can see the image clearly but keep text readable
code = code.replace(
  /<div className={\`absolute inset-0 bg-\[#0a0e17\] z-\[1\] transition-opacity duration-800 \${isExiting \? 'opacity-0' : 'opacity-60'}\`} \/>/,
  '<div className={`absolute inset-0 bg-slate-950/40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/60 to-slate-950/90 z-[1] transition-opacity duration-800 ${isExiting ? \'opacity-0\' : \'opacity-100\'}`} />'
);

// Tweak the button to look like the glassmorphism glowing button in the mockup
code = code.replace(
  /className="bg-\[#00d4ff\] text-white px-10 py-\[15px\] text-\[1.1rem\] md:text-\[1.2rem\] font-semibold rounded-\[50px\] border-none cursor-pointer transition-all duration-300 shadow-\[0_0_20px_rgba\(0,212,255,0.6\)\] hover:scale-105 hover:shadow-\[0_0_30px_rgba\(0,212,255,0.8\)\] focus:outline-none"/,
  'className="bg-slate-950/60 backdrop-blur-md border border-cyan-500/50 text-white px-10 py-[15px] text-[1.1rem] md:text-[1.2rem] font-semibold rounded-[50px] cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.3),inset_0_0_15px_rgba(0,212,255,0.2)] hover:scale-105 hover:bg-slate-900/80 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.5),inset_0_0_20px_rgba(0,212,255,0.4)] focus:outline-none"'
);

fs.writeFileSync('src/components/LandingCover.tsx', code);
console.log("Patched LandingCover background and button");
