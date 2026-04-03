import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
    const canvasRef = useRef(null)
    const sectionRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const section = sectionRef.current
        if (!canvas || !section) return

        const ctx = canvas.getContext('2d')

        // Fix: Make canvas fill the responsive parent
        canvas.width = section.offsetWidth
        canvas.height = section.offsetHeight

        let particles = []
        let animId
        let time = 0
        const mouse = { x: null, y: null, radius: 500 }

        const IMAGE_FILE = '/golden hands.png'
        const PARTICLE_SIZE = 1
        const DENSITY = 2
        const REPEL_RADIUS = 500
        const REPEL_STRENGTH = 1.8
        const RETURN_STRENGTH = 0.05
        const IDLE_SPEED = 0.05
        const IDLE_SCALE = 0.05
        const LOGO_SCALE_FACTOR = 0.5

        // Utility function to convert RGB to Hex
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0');
        }

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.originalX = x;
                this.originalY = y;
                this.vx = 0;
                this.vy = 0;
                this.waveOffset = Math.random() * Math.PI * 2;
                this.color = color;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, PARTICLE_SIZE, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                const idleVx = Math.sin(time + this.waveOffset) * IDLE_SCALE;
                const idleVy = Math.cos(time + this.waveOffset * 0.5) * IDLE_SCALE;
                this.vx += idleVx;
                this.vy += idleVy;

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (mouse.x && distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius * REPEL_STRENGTH;
                    this.vx -= forceDirectionX * force;
                    this.vy -= forceDirectionY * force;
                }

                const returnDx = this.originalX - this.x;
                const returnDy = this.originalY - this.y;
                this.vx += returnDx * RETURN_STRENGTH;
                this.vy += returnDy * RETURN_STRENGTH;

                this.vx *= 0.9;
                this.vy *= 0.9;

                this.x += this.vx;
                this.y += this.vy;
            }
        }

        const logoImage = new Image()
        logoImage.src = IMAGE_FILE

        logoImage.onload = () => {
            if (!logoImage.naturalWidth || !logoImage.naturalHeight) return;
            const scale = Math.min(canvas.width / logoImage.naturalWidth, canvas.height / logoImage.naturalHeight) * LOGO_SCALE_FACTOR;
            const drawWidth = Math.floor(logoImage.naturalWidth * scale);
            const drawHeight = Math.floor(logoImage.naturalHeight * scale);

            if (drawWidth <= 0 || drawHeight <= 0) return;

            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            tempCanvas.width = drawWidth;
            tempCanvas.height = drawHeight;

            tempCtx.drawImage(logoImage, 0, 0, drawWidth, drawHeight);

            const data = tempCtx.getImageData(0, 0, drawWidth, drawHeight).data;
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const offsetX = (canvasWidth - drawWidth) / 2;
            const offsetY = (canvasHeight - drawHeight) / 2;

            for (let y = 0; y < drawHeight; y += DENSITY) {
                for (let x = 0; x < drawWidth; x += DENSITY) {
                    const index = (Math.floor(y) * drawWidth + Math.floor(x)) * 4;
                    const alpha = data[index + 3];

                    if (alpha > 0) {
                        const r = data[index];
                        const g = data[index + 1];
                        const b = data[index + 2];
                        const color = rgbToHex(r, g, b);
                        particles.push(new Particle(x + offsetX, y + offsetY, color));
                    }
                }
            }

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                time += IDLE_SPEED;

                particles.forEach(p => {
                    p.update();
                    p.draw();
                });

                animId = requestAnimationFrame(animate);
            }

            if (particles.length > 0) {
                animate();
            }
        }

        logoImage.onerror = () => {
            ctx.fillStyle = '#FFC107'; ctx.font = 'bold 60px Inter'; ctx.textAlign = 'center'
            ctx.fillText('GOLDEN HANDS', canvas.width / 2, canvas.height / 2)
        }

        const handleMove = e => {
            const r = canvas.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
        }

        const handleResize = () => {
            if (canvas && section) {
                canvas.width = section.offsetWidth;
                canvas.height = section.offsetHeight;
                particles = [];
                // Re-trigger the image load logic to re-sample
                const img = new Image();
                img.src = IMAGE_FILE;
                img.onload = logoImage.onload;
            }
        }

        canvas.addEventListener('mousemove', handleMove)
        window.addEventListener('resize', handleParticleResize)

        function handleParticleResize() {
            handleResize();
        }

        return () => {
            cancelAnimationFrame(animId)
            canvas.removeEventListener('mousemove', handleMove)
            window.removeEventListener('resize', handleParticleResize)
        }
    }, [])

    return (
        <section className="particle-section py-16 bg-broto-black border-y border-broto-grey overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center relative">
                {/* Left side: Text content */}
                <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 z-10">
                    <p className="text-white text-lg sm:text-xl mb-4 uppercase tracking-widest font-light">Start Your Journey</p>
                    <h1 className="text-6xl sm:text-7xl font-black leading-tight mb-6 text-white">
                        <span className="text-broto-yellow">YOUR ROAD</span> <br />
                        TO INDEPENDENCE
                    </h1>
                    <p className="text-xl sm:text-2xl text-white font-medium mb-10 tracking-wider">
                        EXPERT DRIVING TRAINING <br className="hidden sm:block" /> FOR EVERY SKILL LEVEL
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <a href="#service-section" className="inline-block bg-broto-black text-broto-yellow border-2 border-broto-yellow text-lg font-bold px-8 py-4 rounded-xl shadow-2xl hover:bg-broto-yellow hover:text-broto-black transition duration-300 transform hover:scale-105 w-full sm:w-auto text-center">
                            Explore Our Services
                        </a>
                        <a href="tel:+919040040165" className="inline-block bg-broto-yellow text-broto-black border-2 border-broto-yellow text-lg font-bold px-8 py-4 rounded-xl shadow-2xl hover:bg-broto-black hover:text-broto-yellow transition duration-300 transform hover:scale-105 w-full sm:w-auto text-center">
                            Call to Enquiry
                        </a>
                    </div>
                </div>

                {/* Right side: Logo animation */}
                <div ref={sectionRef} className="lg:w-1/2 flex justify-center w-full h-[400px] lg:h-[500px] relative z-10">
                    <canvas id="particleCanvas" ref={canvasRef} className="particle-canvas block w-full h-full" />
                </div>
            </div>
        </section>
    )
}
