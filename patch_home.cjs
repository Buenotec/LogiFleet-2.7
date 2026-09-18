const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const homeBlock = `            {activeTab === "home" && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="max-w-3xl glass-card p-12 rounded-[32px] border border-slate-200/60 dark:border-slate-700/60 shadow-2xl flex flex-col items-center">
                  <img 
                    src="https://raw.githubusercontent.com/Buenotec/Logo_UNI/refs/heads/main/logo_uni.png" 
                    alt="UNI Logo" 
                    className="w-32 md:w-48 object-contain mb-8 filter drop-shadow-md dark:brightness-150"
                  />
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 font-display tracking-tight">
                    DocInsight
                  </h2>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
                    Bem-vindo ao Sistema de BI de Documentação. Utilize o menu lateral para navegar entre os dashboards de licenças, documentação de frota e visões financeiras.
                  </p>
                </div>
              </motion.div>
            )}`;

code = code.replace(homeBlock, '');
fs.writeFileSync('src/App.tsx', code);
console.log("Patched home block successfully");
