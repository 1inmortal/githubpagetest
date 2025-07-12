// ============================================================
// SYSTEM LOG
// ============================================================

window.systemLog = {
    messages: [],
    maxMessages: 100,
    
    add: function(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = {
            timestamp,
            message,
            type
        };
        
        this.messages.push(logEntry);
        
        // Keep only the last maxMessages
        if (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }
        
        // Update UI if log container exists
        this.updateUI();
        
        // Console output for debugging
        console.log(`[${timestamp}] ${message}`);
    },
    
    updateUI: function() {
        const logContainer = document.querySelector('.system-log');
        if (logContainer) {
            logContainer.innerHTML = this.messages
                .slice(-10) // Show last 10 messages
                .map(entry => `
                    <div class="log-entry log-${entry.type}">
                        <span class="log-timestamp">[${entry.timestamp}]</span>
                        <span class="log-message">${entry.message}</span>
                    </div>
                `)
                .join('');
        }
    },
    
    clear: function() {
        this.messages = [];
        this.updateUI();
    }
};

// Initialize system log
document.addEventListener('DOMContentLoaded', () => {
    window.systemLog.add('Sistema de log inicializado', 'success');
    window.systemLog.add('Cargando módulos del portafolio...', 'info');
}); 