; (() => {
    // Get script attributes
    const script = document.currentScript || document.querySelector("script[data-site-id]")
    const siteId = script.getAttribute("data-site-id")
    const token = script.getAttribute("data-token")
    const baseUrl = script.src.replace("/widget.js", "")

    if (!siteId || !token) {
        console.error("ChatBot AI Widget: Missing required attributes data-site-id or data-token")
        return
    }

    // Widget state
    let isOpen = false
    let isLoading = false
    const messages = []
    let siteConfig = null

    // Create widget HTML
    function createWidget() {
        const widgetContainer = document.createElement("div")
        widgetContainer.id = "chatbot-ai-widget"
        widgetContainer.innerHTML = `
      <style>
        #chatbot-ai-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 10000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .chatbot-ai-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #000;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .chatbot-ai-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .chatbot-ai-button svg {
          width: 24px;
          height: 24px;
          fill: white;
        }
        
        .chatbot-ai-chat {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          display: none;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        
        .chatbot-ai-chat.open {
          display: flex;
          animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .chatbot-ai-header {
          background: #000;
          color: white;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .chatbot-ai-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .chatbot-ai-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }
        
        .chatbot-ai-title {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
        }
        
        .chatbot-ai-status {
          font-size: 12px;
          opacity: 0.8;
          margin: 0;
        }
        
        .chatbot-ai-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          opacity: 0.8;
        }
        
        .chatbot-ai-close:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .chatbot-ai-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f9fafb;
        }
        
        .chatbot-ai-message {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
          word-wrap: break-word;
        }
        
        .chatbot-ai-message.user {
          background: #000;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        
        .chatbot-ai-message.bot {
          background: white;
          color: #374151;
          align-self: flex-start;
          border: 1px solid #e5e7eb;
          border-bottom-left-radius: 4px;
        }
        
        .chatbot-ai-message.loading {
          background: white;
          border: 1px solid #e5e7eb;
          align-self: flex-start;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .chatbot-ai-typing {
          display: flex;
          gap: 4px;
        }
        
        .chatbot-ai-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9ca3af;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .chatbot-ai-typing span:nth-child(1) { animation-delay: -0.32s; }
        .chatbot-ai-typing span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .chatbot-ai-input-container {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
          background: white;
        }
        
        .chatbot-ai-input-form {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        
        .chatbot-ai-input {
          flex: 1;
          border: 1px solid #d1d5db;
          border-radius: 20px;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
          resize: none;
          max-height: 100px;
          min-height: 44px;
          font-family: inherit;
        }
        
        .chatbot-ai-input:focus {
          border-color: #000;
          box-shadow: 0 0 0 1px #000;
        }
        
        .chatbot-ai-send {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #000;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .chatbot-ai-send:hover:not(:disabled) {
          background: #374151;
        }
        
        .chatbot-ai-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .chatbot-ai-send svg {
          width: 16px;
          height: 16px;
          fill: white;
        }
        
        @media (max-width: 480px) {
          .chatbot-ai-chat {
            width: calc(100vw - 40px);
            height: calc(100vh - 100px);
            bottom: 80px;
            right: 20px;
          }
        }
      </style>
      
      <button class="chatbot-ai-button" onclick="toggleChat()">
        <svg viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </button>
      
      <div class="chatbot-ai-chat" id="chatbot-ai-chat">
        <div class="chatbot-ai-header">
          <div class="chatbot-ai-header-info">
            <div class="chatbot-ai-avatar">AI</div>
            <div>
              <p class="chatbot-ai-title">Assistant</p>
              <p class="chatbot-ai-status">Online</p>
            </div>
          </div>
          <button class="chatbot-ai-close" onclick="toggleChat()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <div class="chatbot-ai-messages" id="chatbot-ai-messages">
          <div class="chatbot-ai-message bot">
            How can I help you today?
          </div>
        </div>
        
        <div class="chatbot-ai-input-container">
          <form class="chatbot-ai-input-form" onsubmit="window.sendMessage(event)">
            <textarea 
              class="chatbot-ai-input" 
              id="chatbot-ai-input"
              placeholder="Type your message..."
              rows="1"
              onkeydown="window.handleKeyDown(event)"
            ></textarea>
            <button type="submit" class="chatbot-ai-send" id="chatbot-ai-send">
              <svg viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `

        document.body.appendChild(widgetContainer)
    }

    // Load site configuration
    async function loadSiteConfig() {
        try {
            const response = await fetch(`${baseUrl}/api/widget/config?siteId=${siteId}&token=${token}`)
            if (!response.ok) throw new Error("Failed to load configuration")

            siteConfig = await response.json()

            // Apply custom styling
            if (siteConfig.theme) {
                const style = document.createElement("style")
                style.textContent = `
          #chatbot-ai-widget .chatbot-ai-button {
            background: ${siteConfig.theme.primary_color || "#000"} !important;
          }
          #chatbot-ai-widget .chatbot-ai-header {
            background: ${siteConfig.theme.primary_color || "#000"} !important;
          }
          #chatbot-ai-widget .chatbot-ai-message.user {
            background: ${siteConfig.theme.primary_color || "#000"} !important;
          }
          #chatbot-ai-widget .chatbot-ai-send {
            background: ${siteConfig.theme.primary_color || "#000"} !important;
          }
          #chatbot-ai-widget .chatbot-ai-input:focus {
            border-color: ${siteConfig.theme.primary_color || "#000"} !important;
            box-shadow: 0 0 0 1px ${siteConfig.theme.primary_color || "#000"} !important;
          }
        `
                document.head.appendChild(style)

                // Update welcome message
                if (siteConfig.theme.welcome_message) {
                    const welcomeMsg = document.querySelector(".chatbot-ai-message.bot")
                    if (welcomeMsg) {
                        welcomeMsg.textContent = siteConfig.theme.welcome_message
                    }
                }

                // Update title
                if (siteConfig.title) {
                    const titleEl = document.querySelector(".chatbot-ai-title")
                    if (titleEl) {
                        titleEl.textContent = siteConfig.title
                    }
                }
            }
        } catch (error) {
            console.error("ChatBot AI Widget: Failed to load configuration", error)
        }
    }

    // Toggle chat visibility
    window.toggleChat = () => {
        const chat = document.getElementById("chatbot-ai-chat")
        isOpen = !isOpen

        if (isOpen) {
            chat.classList.add("open")
            document.getElementById("chatbot-ai-input").focus()
        } else {
            chat.classList.remove("open")
        }
    }

    // Handle keyboard events
    window.handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            window.sendMessage(event)
        }
    }

    // Send message
    window.sendMessage = async (event) => {
        event.preventDefault()

        const input = document.getElementById("chatbot-ai-input")
        const message = input.value.trim()

        if (!message || isLoading) return

        // Add user message
        addMessage(message, "user")
        input.value = ""

        // Show loading
        isLoading = true
        const loadingId = addLoadingMessage()

        try {
            const response = await fetch(`${baseUrl}/api/widget/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    siteId,
                    token,
                    message,
                    sessionId: getSessionId(),
                }),
            })

            if (!response.ok) throw new Error("Failed to send message")

            const data = await response.json()

            // Remove loading message
            removeLoadingMessage(loadingId)

            // Add bot response
            addMessage(data.response, "bot")
        } catch (error) {
            console.error("ChatBot AI Widget: Failed to send message", error)
            removeLoadingMessage(loadingId)
            addMessage("Sorry, I encountered an error. Please try again.", "bot")
        } finally {
            isLoading = false
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messagesContainer = document.getElementById("chatbot-ai-messages")
        const messageEl = document.createElement("div")
        messageEl.className = `chatbot-ai-message ${sender}`
        messageEl.textContent = text

        messagesContainer.appendChild(messageEl)
        messagesContainer.scrollTop = messagesContainer.scrollHeight

        messages.push({ text, sender, timestamp: Date.now() })
    }

    // Add loading message
    function addLoadingMessage() {
        const messagesContainer = document.getElementById("chatbot-ai-messages")
        const loadingEl = document.createElement("div")
        const loadingId = "loading-" + Date.now()

        loadingEl.id = loadingId
        loadingEl.className = "chatbot-ai-message loading"
        loadingEl.innerHTML = `
      <div class="chatbot-ai-typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span>Thinking...</span>
    `

        messagesContainer.appendChild(loadingEl)
        messagesContainer.scrollTop = messagesContainer.scrollHeight

        return loadingId
    }

    // Remove loading message
    function removeLoadingMessage(loadingId) {
        const loadingEl = document.getElementById(loadingId)
        if (loadingEl) {
            loadingEl.remove()
        }
    }

    // Get or create session ID
    function getSessionId() {
        let sessionId = sessionStorage.getItem("chatbot-ai-session")
        if (!sessionId) {
            sessionId = "session-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)
            sessionStorage.setItem("chatbot-ai-session", sessionId)
        }
        return sessionId
    }

    // Initialize widget
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", init)
            return
        }

        createWidget()
        loadSiteConfig()
    }

    init()
})()
