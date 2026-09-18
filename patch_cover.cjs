const fs = require('fs');
let code = fs.readFileSync('src/components/LandingCover.tsx', 'utf8');

// Add format import
if (!code.includes('import { format }')) {
  code = code.replace(
    `import * as THREE from 'three';`,
    `import * as THREE from 'three';\nimport { format } from 'date-fns';`
  );
}

// Update props
code = code.replace(
  `interface LandingCoverProps {
  onStart: () => void;
}`,
  `interface LandingCoverProps {
  onStart: () => void;
  lastUpdated?: Date;
}`
);

// Update component signature
code = code.replace(
  `export function LandingCover({ onStart }: LandingCoverProps) {`,
  `export function LandingCover({ onStart, lastUpdated }: LandingCoverProps) {`
);

// Add current time state
code = code.replace(
  `const [vantaEffect, setVantaEffect] = useState<any>(null);`,
  `const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);`
);

// Add header and footer
code = code.replace(
  `      {/* Overlay for legibility */}`,
  `      {/* Header */}
      <div className={\`absolute top-0 w-full p-4 md:p-6 flex flex-col md:flex-row justify-between items-center z-[2] transition-opacity duration-500 text-white/70 text-xs md:text-sm font-medium \${isExiting ? 'opacity-0' : 'opacity-100'}\`}>
        <div className="mb-2 md:mb-0">
          Atualização do Sistema: <span className="text-white">{lastUpdated ? format(lastUpdated, "dd/MM/yyyy 'às' HH:mm:ss") : format(new Date(), "dd/MM/yyyy 'às' HH:mm:ss")}</span>
        </div>
        <div>
          Data/Hora Local: <span className="text-white">{format(currentTime, "dd/MM/yyyy 'às' HH:mm:ss")}</span>
        </div>
      </div>

      {/* Footer */}
      <div className={\`absolute bottom-0 w-full p-4 md:p-6 text-center z-[2] transition-opacity duration-500 text-white/50 text-xs md:text-sm font-medium tracking-wide \${isExiting ? 'opacity-0' : 'opacity-100'}\`}>
        Desenvolvido por <span className="text-white/80 font-bold">rbtecX</span> - Ribeirão Preto | SP
      </div>

      {/* Overlay for legibility */}`
);

fs.writeFileSync('src/components/LandingCover.tsx', code);
console.log("Patched LandingCover");
