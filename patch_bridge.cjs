const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Change initial state
code = code.replace(
  'const [activeTab, setActiveTab] = useState<"home" | "dashboard" | "licencas_detalhadas" | "licencas_documentos" | "financeiro_docs" | "financeiro_licencas" | "map" | "settings">("home");',
  'const [activeTab, setActiveTab] = useState<"home" | "dashboard" | "licencas_detalhadas" | "licencas_documentos" | "financeiro_docs" | "financeiro_licencas" | "map" | "settings">("dashboard");'
);

// 2. Remove if (showCover) { return ... }
code = code.replace(
  `  if (showCover) {
    return <LandingCover onStart={() => setShowCover(false)} />;
  }

  return (
    <div className={cn("flex h-screen`,
  `  return (
    <>
      {showCover && <LandingCover onStart={() => setShowCover(false)} />}
      <div className={cn("flex h-screen`
);

// 3. Find the end of the return statement for App and add </>
// It ends with:
//         </div>
//       </main>
//     </div>
//   );
// }

code = code.replace(
  `        </div>
      </main>
    </div>
  );
}`,
  `        </div>
      </main>
    </div>
    </>
  );
}`
);

// 4. Update the Página Inicial button
code = code.replace(
  `          <NavItem 
            icon={<Home size={20} />} 
            label="Página Inicial" 
            active={activeTab === "home"} 
            onClick={() => setActiveTab("home")}
            collapsed={!isSidebarOpen}
          />`,
  `          <NavItem 
            icon={<Home size={20} />} 
            label="Página Inicial" 
            active={false} 
            onClick={() => setShowCover(true)}
            collapsed={!isSidebarOpen}
          />`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched successfully");
