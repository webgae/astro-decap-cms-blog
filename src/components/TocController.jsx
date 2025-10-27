import { useState, useEffect, useMemo } from 'preact/hooks';

const slugify = (text) =>
	text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');

export default function TocController({ contentSelector }) {
	const [isTocOpen, setIsTocOpen] = useState(false);
	const [isTocVisible, setIsTocVisible] = useState(false);
	const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
	const [headings, setHeadings] = useState([]);
	const [activeHeadingId, setActiveHeadingId] = useState(null);

	// useEffect se ejecuta en el cliente, después de que el DOM está listo.
	useEffect(() => {
		// Esta función intentará encontrar los encabezados.
		const findHeadings = () => {
			const contentArea = document.querySelector(contentSelector);
			if (!contentArea) return false;

			const headingElements = contentArea.querySelectorAll('h2, h3');
			if (headingElements.length > 0) {
				const newHeadings = Array.from(headingElements).map((heading, index) => {
					const id = heading.id || slugify(heading.textContent) || `heading-${index}`;
					heading.id = id;
					return {
						id: id,
						text: heading.textContent,
						level: Number(heading.tagName.substring(1)),
					};
				});
				setHeadings(newHeadings);
				return true; // Éxito
			}
			return false; // Aún no se encuentran
		};

		// Intentamos encontrar los encabezados. Si no están, reintentamos.
		if (!findHeadings()) {
			const interval = setInterval(() => {
				if (findHeadings()) {
					clearInterval(interval);
				}
			}, 100);
			// Limpiamos el intervalo después de un tiempo para evitar bucles infinitos.
			setTimeout(() => clearInterval(interval), 3000);
			return () => clearInterval(interval);
		}
	}, [contentSelector]);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setIsTocVisible(scrollY > 100);
			setIsScrollTopVisible(scrollY > 400);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Efecto para observar los encabezados y resaltar el activo
	useEffect(() => {
		if (headings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveHeadingId(entry.target.id);
					}
				});
			},
			{
				rootMargin: '0px 0px -80% 0px', // Activa el heading cuando está en el 20% superior de la pantalla
			}
		);

		const headingElements = document.querySelectorAll(headings.map(h => `#${h.id}`).join(', '));
		headingElements.forEach((el) => observer.observe(el));

		// Limpieza al desmontar el componente
		return () => {
			headingElements.forEach((el) => observer.unobserve(el));
		};

	}, [headings]); // Se ejecuta cuando los encabezados están listos

	useEffect(() => {
		document.body.classList.toggle('toc-open', isTocOpen);
		// Opcional: Bloquear scroll del body cuando el menú está abierto
		// document.body.style.overflow = isTocOpen ? 'hidden' : '';
	}, [isTocOpen]);

	const handleTocToggle = () => setIsTocOpen(!isTocOpen);
	const closeToc = () => setIsTocOpen(false);

	const handleLinkClick = (e, id) => {
		e.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		closeToc();
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			{/* Botón y Panel del TOC: Solo se muestra si hay encabezados */}
			{headings.length > 0 && (
				<>
					<button 
						id="toc-toggle" 
						className={`${isTocVisible ? 'is-visible' : ''} ${isTocOpen ? 'is-active' : ''}`} 
						onClick={handleTocToggle} 
						aria-label={isTocOpen ? "Cerrar índice de contenidos" : "Abrir índice de contenidos"}
					>
						{isTocOpen ? (
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
						)}
					</button>
					<nav id="toc-container" className={`toc-panel ${isTocOpen ? 'is-open' : ''}`}>
						<h3>Contenido del Artículo</h3>
						<ul className="toc-list">
							{headings.map(heading => (
								<li key={heading.id} className={`toc-item level-${heading.level} ${activeHeadingId === heading.id ? 'is-active' : ''}`}>
									<a
										href={`#${heading.id}`}
										onClick={(e) => handleLinkClick(e, heading.id)}
									>
										{heading.text}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</>
			)}

			{/* Botón para Subir Arriba */}
			<button id="scroll-to-top" className={isScrollTopVisible ? 'is-visible' : ''} onClick={scrollToTop} aria-label="Subir arriba">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>
				</svg>
			</button>
		</>
	);
}