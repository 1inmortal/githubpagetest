// ============================================================
// CIRCUIT MESH
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const circuitCanvas = document.getElementById('circuitMesh');
    
    if (circuitCanvas) {
        const ctx = circuitCanvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            circuitCanvas.width = circuitCanvas.offsetWidth;
            circuitCanvas.height = circuitCanvas.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Circuit nodes and connections
        const nodes = [];
        const connections = [];
        
        // Initialize circuit mesh
        function initCircuitMesh() {
            const nodeCount = 20;
            const connectionCount = 30;
            
            // Create nodes
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * circuitCanvas.width,
                    y: Math.random() * circuitCanvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 3 + 1
                });
            }
            
            // Create connections
            for (let i = 0; i < connectionCount; i++) {
                const node1 = nodes[Math.floor(Math.random() * nodes.length)];
                const node2 = nodes[Math.floor(Math.random() * nodes.length)];
                
                if (node1 !== node2) {
                    connections.push({
                        from: node1,
                        to: node2,
                        opacity: Math.random() * 0.5 + 0.1
                    });
                }
            }
        }
        
        // Animation loop
        function animate() {
            // Clear canvas
            ctx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);
            
            // Update nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x < 0 || node.x > circuitCanvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > circuitCanvas.height) node.vy *= -1;
                
                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 170, 0.8)';
                ctx.fill();
            });
            
            // Draw connections
            connections.forEach(connection => {
                ctx.beginPath();
                ctx.moveTo(connection.from.x, connection.from.y);
                ctx.lineTo(connection.to.x, connection.to.y);
                ctx.strokeStyle = `rgba(0, 255, 170, ${connection.opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            });
            
            requestAnimationFrame(animate);
        }
        
        // Initialize and start animation
        initCircuitMesh();
        animate();
    }
}); 