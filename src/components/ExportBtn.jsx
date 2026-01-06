export default function ExportButton() {
  const exportHTML = () => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return alert("Canvas not found");

    // clone canvas
    const clone = canvas.cloneNode(true);

  // The sandbox is needed so the cloned canvas can be fully rendered and measured by the browser without affecting the real page or the user’s view
    const sandbox = document.createElement("div");
    sandbox.style.position = "fixed";
    sandbox.style.left = "-99999px";//moves the sandbox far outside the visible screen to the left
    sandbox.style.top = "0";
    sandbox.style.width = canvas.offsetWidth + "px";//Forces the sandbox to have exactly the same width as the real canvas
    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    // remove editor-only UI
    clone.querySelectorAll("[data-editor-only]").forEach(el => el.remove());

    // replace inputs & textareas with static text
    clone.querySelectorAll("input, textarea").forEach(el => {
      const div = document.createElement("div");//making an element
      div.textContent = el.value || el.placeholder || "";//adding the text content to div
      div.className = el.className;//copying all the styling to the div
      el.replaceWith(div);
    });

    // freeze react-rnd transforms,absolute positioning
    const parentRect = clone.getBoundingClientRect();

    clone.querySelectorAll("*").forEach(el => {
      const style = window.getComputedStyle(el);//gets all the styles given to the element
      if (style.transform !== "none") {//elments that are resizable and drsggable 
        const rect = el.getBoundingClientRect();//exact on-screen geometry of an element
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
    inlineStyles(clone);//making all the css inline

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
    const blob = new Blob([html], { type: "text/html" });//Binary Large Object:like a file in the memory
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);//When this link is opened, the browser will read the Blob as a file.
    a.download = "page.html";//tells browser to download this URL instead of navigating to it,Sets the filename to page.html,browser opens a new tab without this
    a.click();//Programmatically triggers a click event,Browser behaves as if the user clicked a download link
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
