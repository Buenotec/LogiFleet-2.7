const fs = require('fs');
let code = fs.readFileSync('src/components/LandingCover.tsx', 'utf8');

const targetBlock = `{/* Glow effect behind the logo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-orange-500/20 blur-[40px] rounded-full scale-150" />
          <img 
            src="https://raw.githubusercontent.com/Buenotec/Logo_UNI/refs/heads/main/logo_uni.png" 
            alt="UNI Logo" 
            className="relative w-[140px] md:w-[200px] object-contain drop-shadow-[0_0_25px_rgba(255,100,50,0.6)]"
          />
        </div>
        
        <h1 
          className="text-[2.5rem] md:text-[3.5rem] font-bold mb-3 font-display leading-tight tracking-tight drop-shadow-xl"
          style={{
            color: 'white',
            textShadow: '0 0 20px rgba(255,255,255,0.3)'
          }}
        >
          DocInsight <span className="text-white/90">- BI de Documentação</span>
        </h1>
        
        <p className="text-[1rem] md:text-[1.1rem] text-slate-300 mb-14 font-medium max-w-2xl drop-shadow-md tracking-wide">
          Inteligência e visualização de dados documentais em tempo real
        </p>`;

const newBlock = `{/* Massive Explosive Glow / Shadow Layer behind everything central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120vw] max-w-[1000px] h-[800px] pointer-events-none flex flex-col items-center justify-center">
          {/* Intense bright center explosion */}
          <div className="absolute w-[400px] h-[300px] bg-cyan-200/30 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute w-[700px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen" />
          
          {/* Dark contrasting shadow bed underneath text to ensure legibility */}
          <div className="absolute top-[50%] w-[1200px] h-[350px] bg-slate-950/70 blur-[80px] rounded-[100%]" />
        </div>

        <div className="relative mb-8 flex justify-center items-center">
          {/* Secondary bright spot directly behind logo */}
          <div className="absolute w-[250px] h-[150px] bg-white/10 blur-[60px] rounded-full mix-blend-screen" />
          <img 
            src="https://raw.githubusercontent.com/Buenotec/Logo_UNI/refs/heads/main/logo_uni.png" 
            alt="UNI Logo" 
            className="relative w-[140px] md:w-[200px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
          />
        </div>
        
        <h1 
          className="text-[2.5rem] md:text-[3.5rem] font-bold mb-3 font-display leading-tight tracking-tight relative"
          style={{
            color: 'white',
            textShadow: '0 6px 30px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9)'
          }}
        >
          DocInsight <span className="text-white/90">- BI de Documentação</span>
        </h1>
        
        <p 
          className="text-[1rem] md:text-[1.1rem] text-slate-200 mb-14 font-medium max-w-2xl tracking-wide relative"
          style={{ textShadow: '0 4px 15px rgba(0,0,0,1)' }}
        >
          Inteligência e visualização de dados documentais em tempo real
        </p>`;

code = code.replace(targetBlock, newBlock);
fs.writeFileSync('src/components/LandingCover.tsx', code);
console.log("Patched glow");
