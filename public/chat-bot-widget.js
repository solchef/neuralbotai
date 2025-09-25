(function () {
    // Prevent duplicate injection
    if (document.getElementById("sentseven-chat-launcher")) return;

    // --- Styles ---
    const style = document.createElement("style");
    style.textContent = `
    #sentseven-chat-iframe {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 380px;
      height: 520px;
      border: none;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      display: none;
      z-index: 999999;
    }

    #sentseven-chat-launcher {
      position: fixed;
      bottom: 20px;
      right: 10px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 999999;
      background: var(--chat-launcher-bg, #2563eb);
      color: var(--chat-launcher-text, #fff);
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
  `;
    document.head.appendChild(style);

    // --- Iframe ---
    const iframe = document.createElement("iframe");
    iframe.id = "sentseven-chat-iframe";
    iframe.src = "https://aibot.centseven.com/widget"; // change when deployed
    document.body.appendChild(iframe);

    // --- Launcher Button ---
    const launcher = document.createElement("div");
    launcher.id = "sentseven-chat-launcher";
    launcher.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3C6.48 3 2 6.93 2 12c0 2.41 1.05 4.63 2.81 6.29L4 21l3.03-1.36C8.09 20.55 9.99 21 12 21c5.52 0 10-3.93 10-9s-4.48-9-10-9zm0 14c-1.1 0-2.12-.23-3.03-.65l-.43-.2-.51.23-.88.39.17-.94.12-.64-.47-.46C6.33 13.88 6 12.97 6 12c0-3.31 3.13-6 7-6s7 2.69 7 6-3.13 6-7 6z"/>
    </svg>
  `;
    document.body.appendChild(launcher);

    // --- Toggle Logic ---
    launcher.addEventListener("click", () => {
        const isOpen = iframe.style.display === "block";
        iframe.style.display = isOpen ? "none" : "block";
    });
})();
