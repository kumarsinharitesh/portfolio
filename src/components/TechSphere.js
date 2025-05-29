import React, { useEffect, useRef, useState } from 'react';
import './TechSphere.css';
import { 
  FaGithub, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaNpm, FaJs, FaAws, FaDatabase
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiExpress, SiMongodb, 
  SiTailwindcss, SiFirebase 
} from 'react-icons/si';

const TechSphere = () => {
  const sphereRef = useRef(null);
  const animationRef = useRef(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [effectIntensity, setEffectIntensity] = useState(1);
  
  const logoComponents = [
    { Icon: FaJs, color: '#F7DF1E', name: 'JavaScript' },
    { Icon: FaReact, color: '#61DAFB', name: 'React' },
    { Icon: FaHtml5, color: '#E34F26', name: 'HTML5' },
    { Icon: FaCss3Alt, color: '#1572B6', name: 'CSS3' },
    { Icon: FaNodeJs, color: '#83CD29', name: 'Node.js' },
    { Icon: SiExpress, color: '#FFFFFF', name: 'Express' },
    { Icon: SiMongodb, color: '#4DB33D', name: 'MongoDB' },
    { Icon: FaDatabase, color: '#00A1E0', name: 'SQL' },
    { Icon: FaGitAlt, color: '#F05032', name: 'Git' },
    { Icon: FaAws, color: '#FF9900', name: 'AWS' },
    { Icon: SiNextdotjs, color: '#FFFFFF', name: 'Next.js' },
    { Icon: SiTailwindcss, color: '#38B2AC', name: 'Tailwind' },
    { Icon: FaGithub, color: '#FFFFFF', name: 'GitHub' },
    { Icon: FaNpm, color: '#CB3837', name: 'NPM' },
    { Icon: SiFirebase, color: '#FFCA28', name: 'Firebase' }
  ];

  // Function to start a rapid spin animation
  const triggerSpinEffect = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };

  // Function to trigger a pulsing effect
  const triggerShrinkEffect = () => {
    setIsShrunk(true);
    setTimeout(() => setIsShrunk(false), 1000);
  };

  // Increase effect intensity temporarily
  const boostEffectIntensity = () => {
    setEffectIntensity(3);
    setTimeout(() => setEffectIntensity(1), 2000);
  };

  useEffect(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    const icons = sphere.querySelectorAll('.tech-icon');
    const radius = 180; // sphere radius
    const total = icons.length;
    
    let mouseX = 0;
    let mouseY = 0;
    let autoRotateSpeed = 0.5;
    let baseAngle = 0;
    let lastInteractionTime = 0;
    let wobbleEffect = 0;
    
    // Periodically add a slight wobble to the sphere
    const wobbleInterval = setInterval(() => {
      // Only apply wobble if user hasn't interacted recently
      if (Date.now() - lastInteractionTime > 3000) {
        wobbleEffect = Math.sin(Date.now() / 1000) * 0.5;
      }
    }, 100);
    
    const calculatePosition = (index, totalItems, baseAngle) => {
      // Fibonacci sphere algorithm for even distribution
      const phi = Math.acos(-1 + (2 * index) / totalItems);
      const theta = Math.sqrt(totalItems * Math.PI) * phi + baseAngle;
      
      // Apply spinning effect if active
      const spinFactor = isSpinning ? Date.now() / 200 : 0;
      const actualTheta = theta + spinFactor;
      
      // Apply extra movement based on index for more dynamic feel
      const individualWobble = Math.sin(Date.now() / 1000 + index) * 6;
      
      // Calculate base position
      let x = radius * Math.cos(actualTheta) * Math.sin(phi);
      let y = radius * Math.sin(actualTheta) * Math.sin(phi);
      let z = radius * Math.cos(phi);
      
      // Apply shrink effect if active
      const shrinkFactor = isShrunk ? 0.7 : 1;
      
      // Apply wobble effect for natural movement
      x += wobbleEffect * 12;
      y += individualWobble * (isSpinning ? 0.6 : 0.25);
      
      return { 
        x: x * shrinkFactor, 
        y: y * shrinkFactor, 
        z: z * shrinkFactor 
      };
    };
    
    const animate = () => {
      // Speed up rotation during spin effect
      const rotationSpeed = isSpinning ? 0.03 : 0.003;
      baseAngle += rotationSpeed * autoRotateSpeed;
      
      icons.forEach((icon, i) => {
        const { x, y, z } = calculatePosition(i, total, baseAngle);
        
        // Apply mouse influence
        const mouseInfluence = effectIntensity * 0.12;
        const finalX = x + mouseX * mouseInfluence;
        const finalY = y + mouseY * mouseInfluence;
        
        // Add subtle floating effect based on time
        const floatEffect = Math.sin(Date.now() / 1000 + i * 0.5) * 4;
        
        // Adjust size based on z-position (closer = larger)
        const scale = Math.max(0.7, (radius + z) / (radius * 1.9));
        
        // Adjust opacity based on position - increased minimum for better visibility
        const opacity = Math.max(0.55, (radius + z) / (radius * 1.9));
        
        // Update CSS transforms with floating effect
        icon.style.transform = `translate3d(${finalX}px, ${finalY + floatEffect}px, ${z}px) scale(${scale})`;
        icon.style.opacity = opacity;
        icon.style.zIndex = Math.floor(z + radius);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      const rect = sphere.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Record interaction time
      lastInteractionTime = Date.now();
      
      // Calculate mouse position relative to center of sphere
      mouseX = (e.clientX - centerX) * 0.9 * effectIntensity;
      mouseY = (e.clientY - centerY) * 0.9 * effectIntensity;
      
      // Slow down auto-rotation when user is interacting
      autoRotateSpeed = 0.2;
      
      // Reset wobble effect during interaction
      wobbleEffect = 0;
    };
    
    // Reset when mouse leaves
    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
      autoRotateSpeed = 0.5;
    };
    
    // Add double-click handler for special effects
    const handleDoubleClick = () => {
      triggerSpinEffect();
      setTimeout(triggerShrinkEffect, 1000);
      boostEffectIntensity();
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    sphere.addEventListener('mouseleave', handleMouseLeave);
    sphere.addEventListener('dblclick', handleDoubleClick);
    
    return () => {
      clearInterval(wobbleInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      sphere.removeEventListener('mouseleave', handleMouseLeave);
      sphere.removeEventListener('dblclick', handleDoubleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isSpinning, isShrunk, effectIntensity]);

  const handleIconClick = (name) => {
    setActiveIcon(name === activeIcon ? null : name);
    // Add a small shrink effect when clicking an icon
    triggerShrinkEffect();
  };
  
  return (
    <div className="tech-sphere-container">
      <div className={`tech-sphere ${isSpinning ? 'spinning' : ''} ${isShrunk ? 'shrinking' : ''}`} ref={sphereRef}>
        {logoComponents.map(({ Icon, color, name }, index) => (
          <div 
            className={`tech-icon ${activeIcon === name ? 'active' : ''}`}
            key={index}
            style={{ color }}
            onClick={() => handleIconClick(name)}
            title={name}
          >
            <Icon />
            {activeIcon === name && (
              <div className="tech-name-tooltip">{name}</div>
            )}
          </div>
        ))}
      </div>
      {activeIcon && (
        <div className="tech-info">
          <div className="tech-info-content">
            <h3>{activeIcon}</h3>
          </div>
        </div>
      )}
      <div className="sphere-glow"></div>
    </div>
  );
};

export default TechSphere; 