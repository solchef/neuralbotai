; (() => {
  if (window.__SENTSEVEN_WIDGET__) return;
  window.__SENTSEVEN_WIDGET__ = true;

  const baseUrl = "http://localhost:3000";

  let siteId = null;
  let token = null;

  if (document.currentScript) {
    const scriptEl = document.currentScript;
    siteId = scriptEl.dataset.siteId;
    token = scriptEl.dataset.token;
  } else {
    const container = document.getElementById("chatbot-container");
    siteId = container?.getAttribute("data-site-id") ?? undefined;
    token = container?.getAttribute("data-token") ?? undefined;
  }

  // console.log("Loaded siteId:", siteId, "token:", token);


  // --- Styles ---
  const style = document.createElement("style");
  style.textContent = `
    #sentseven-chat-launcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 999999;
      background: #2563eb;
      color: #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: all 0.3s ease;
    }

    #sentseven-chat-launcher:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0,0,0,0.2);
    }

    #sentseven-chat-launcher svg {
      width: 28px;
      height: 28px;
    }

    #sentseven-chat-iframe {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      height: 520px;
      border: none;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      display: none;
      z-index: 999999;
      overflow: hidden;
      background: #fff;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      #sentseven-chat-iframe {
        width: calc(100vw - 40px);
        height: calc(100vh - 100px);
        bottom: 80px;
        right: 20px;
      }
    }
  `;
  document.head.appendChild(style);

  // --- Iframe ---
  const iframe = document.createElement("iframe");
  iframe.id = "sentseven-chat-iframe";
  iframe.src = `${baseUrl}/widget?site-id=${siteId}&token=${token}`;
  document.body.appendChild(iframe);

  // --- Launcher ---
  const launcher = document.createElement("div");
  launcher.id = "sentseven-chat-launcher";
  launcher.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 
      1.1.9 2 2 2h4l4 4 4-4h4c1.1 
      0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 
      12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  `;
  document.body.appendChild(launcher);

  // --- Toggle Logic ---
  launcher.addEventListener("click", () => {
    const isOpen = iframe.style.display === "block";
    iframe.style.display = isOpen ? "none" : "block";
  });

  // ✅ Close when iframe sends CLOSE_WIDGET
  window.addEventListener("message", (event) => {
    if (event.data?.type === "CLOSE_WIDGET") {
      iframe.style.display = "none";
    }
  });
})();
