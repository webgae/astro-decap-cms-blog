import { useState, useEffect } from 'preact/hooks';

export default function InteractiveHeader({ children }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// Inicializa el tema desde localStorage o prefiere el esquema del sistema
	const [theme, setTheme] = useState(() => {
		if (typeof localStorage !== 'undefined') {
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme) return savedTheme;
		}
		if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}
		return 'light';
	});

	// Efecto para aplicar el tema y controlar el scroll del body
	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : '';
		if (isMenuOpen) {
			document.body.style.paddingRight = '0px'; // Evitar el desplazamiento horizontal
		} else {
			document.body.style.paddingRight = '';
		}
	}, [isMenuOpen]);

	const handleThemeToggle = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<div className={`nav-links ${isMenuOpen ? 'is-open' : ''}`} id="nav-links">
				<div className="internal-links">
					{children}
				</div>
			</div>

			<div className="header-controls">
				<div className="theme-toggle">
					<button id="theme-toggle-button" onClick={handleThemeToggle} aria-label="Toggle theme">
						<span className="sr-only">Toggle theme</span>
						{/* Icono de luna (para pasar a oscuro) */}
						<svg className={theme === 'dark' ? 'hidden' : ''} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
						</svg>
						{/* Icono de sol (para pasar a claro) */}
						<svg className={theme === 'light' ? 'hidden' : ''} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="12" cy="12" r="5"></circle>
							<line x1="12" y1="1" x2="12" y2="3"></line>
							<line x1="12" y1="21" x2="12" y2="23"></line>
							<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
							<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
							<line x1="1" y1="12" x2="3" y2="12"></line>
							<line x1="21" y1="12" x2="23" y2="12"></line>
							<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
							<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
						</svg>
					</button>
				</div>
				<button id="mobile-menu-toggle" className={`mobile-menu-toggle ${isMenuOpen ? 'is-active' : ''}`} onClick={handleMenuToggle} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
					{/* Icono de menú (hamburguesa) */}
					<svg className={isMenuOpen ? 'hidden' : ''} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
					{/* Icono de cerrar (X) - solo visible cuando el menú está abierto */}
					<svg className={!isMenuOpen ? 'hidden' : ''} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
				</button>
			</div>
		</>
	);
}