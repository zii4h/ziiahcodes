export default function ProjectGrid({ projects, hidden, id }) {
  return (
    <div className="projects-grid" id={id} hidden={hidden}>
      {projects.map((project) => {
        const image = project.thumb.replace(/\.png$/, "");
        return (
          <article className="project-card reveal" key={project.name}>
            <img
              className="project-thumb"
              src={`${image}-640.webp`}
              srcSet={`${image}-640.webp 640w, ${image}-960.webp 960w`}
              sizes="(max-width: 420px) calc(100vw - 40px), (max-width: 700px) calc((100vw - 56px) / 2), 322px"
              alt={`${project.name} project preview`}
              width="640"
              height="360"
              loading="lazy"
              decoding="async"
            />
            <div className="project-body">
              <h3 className="project-name">{project.name}</h3>
              <div className="project-year">{project.year}</div>
              <p className="project-desc">{project.desc}</p>
              <div className="tech-wrap">
                {project.tech.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}
              </div>
              <div className="project-links">
                {project.links.map((link) => (
                  <a className="proj-link" href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>
                    🌐 {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
