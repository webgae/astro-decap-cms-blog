import { useState, useEffect, useMemo } from 'preact/hooks';

const slugify = (text) =>
	text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');

export default function TableOfContents({ content }) {
	const [activeId, setActiveId] = useState('');

	const headings = useMemo(() => {
		if (typeof window === 'undefined') return [];
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = content;
		const headingElements = tempDiv.querySelectorAll('h2, h3');
		return Array.from(headingElements).map(heading => {
			const id = slugify(heading.textContent);
			heading.id = id; // Asignamos un ID al elemento original en el DOM
			return {
				id: id,
				text: heading.textContent,
				level: Number(heading.tagName.substring(1)),
			};
		});
	}, [content]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: '0px 0px -80% 0px' } // Activa cuando el heading está en el 20% superior de la pantalla
		);

		document.querySelectorAll('article h2, article h3').forEach(heading => {
			observer.observe(heading);
		});

		return () => observer.disconnect();
	}, [headings]);

	if (headings.length === 0) return null;

	return (
		<div className="toc-panel">
			<h3>En este artículo</h3>
			<ul className="toc-list">
				{headings.map(heading => (
					<li key={heading.id} className={`toc-item level-${heading.level} ${activeId === heading.id ? 'is-active' : ''}`}>
						<a href={`#${heading.id}`}>{heading.text}</a>
					</li>
				))}
			</ul>
		</div>
	);
}

