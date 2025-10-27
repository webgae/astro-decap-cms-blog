import { useState, useMemo } from 'preact/hooks';

// Replicamos la estructura de ProjectCard.astro como un componente de Preact
// para poder renderizarlo dinámicamente en el cliente.
function ProjectCard({ img, title, description, tags, url }) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="project-card">
            <img src={img.src} alt={`Imagen del proyecto ${title}`} className="card-image" loading="lazy" width={img.width} height={img.height} />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <div className="tags">
                    {tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </a>
    );
}

export default function FilteredProjects({ projects }) {
    const [selectedTag, setSelectedTag] = useState('Todos');

    // Usamos useMemo para calcular las etiquetas una sola vez
    const allTags = useMemo(() => {
        const tagsSet = new Set();
        projects.forEach(project => {
            project.tags.forEach(tag => tagsSet.add(tag));
        });
        return ['Todos', ...Array.from(tagsSet).sort()];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (selectedTag === 'Todos') {
            return projects;
        }
        return projects.filter(project => project.tags.includes(selectedTag));
    }, [selectedTag, projects]);

    return (
        <>
            <div className="filter-tags">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
                        onClick={() => setSelectedTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="projects-grid">
                {filteredProjects.map(project => (
                    <ProjectCard key={project.title} {...project} />
                ))}
            </div>
        </>
    );
}
