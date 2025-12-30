export default function ExportButton() {
  const exportHTML = () => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return alert("Canvas not found");

    // clone canvas
    const clone = canvas.cloneNode(true);

   
    const sandbox = document.createElement("div");
    sandbox.style.position = "fixed";
    sandbox.style.left = "-99999px";
    sandbox.style.top = "0";
    sandbox.style.width = canvas.offsetWidth + "px";
    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    // remove editor-only UI
    clone.querySelectorAll("[data-editor-only]").forEach(el => el.remove());

    // replace inputs & textareas with static text
    clone.querySelectorAll("input, textarea").forEach(el => {
      const div = document.createElement("div");
      div.textContent = el.value || el.placeholder || "";
      div.className = el.className;
      el.replaceWith(div);
    });

    // freeze react-rnd transforms → absolute positioning
    const parentRect = clone.getBoundingClientRect();

    clone.querySelectorAll("*").forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.transform !== "none") {
        const rect = el.getBoundingClientRect();
        el.style.position = "absolute";
        el.style.left = rect.left - parentRect.left + "px";
        el.style.top = rect.top - parentRect.top + "px";
        el.style.transform = "none";
      }
    });

    // inline ALL computed styles
    const inlineStyles = (el) => {
      const computed = window.getComputedStyle(el);
      let css = "";
      for (let prop of computed) {
        css += `${prop}:${computed.getPropertyValue(prop)};`;
      }
      el.setAttribute("style", css);
      [...el.children].forEach(inlineStyles);
    };
    inlineStyles(clone);

    // build final HTML
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Export</title>
</head>
<body style="margin:0;">
${clone.outerHTML}
</body>
</html>`;

    // cleanup
    document.body.removeChild(sandbox);

    // download
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "page.html";
    a.click();
  };

  return (
    <button
      onClick={exportHTML}
      className="rounded-full bg-pink-500 px-4 py-2 text-white"
    >
      Export HTML
    </button>
  );
}
