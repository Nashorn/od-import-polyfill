(()=> {
  var modulemap = window.modulemap ={};
  window.load = async function importModule(url) {
    url = (window.importmap[url]||url).replace(/^\/+/, Config.ROOTPATH);
    var absURL = toAbsoluteURL(url);
    var mod=modulemap[absURL];
    if (mod) { return mod};
    return new Promise(async (resolve, reject) => {
      if (mod) { resolve(mod)};
      var s1 = document.createElement("script");
          s1.type = "module";
          s1.onerror = () => reject(new Error(`404: ${absURL}`));
          s1.onload  = () => {
            resolve(modulemap[absURL]); URL.revokeObjectURL(s1.src); s1.remove();
          };
      const loader = `import * as m from "${absURL}"; modulemap['${absURL}'] = m;`;
      const blob = new Blob([loader], { type: "text/javascript" });
      s1.src = URL.createObjectURL(blob);
      document.head.appendChild(s1);
    });
  };
})();