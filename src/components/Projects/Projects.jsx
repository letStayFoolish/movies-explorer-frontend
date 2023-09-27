import { projects } from '../../utils/constants'
import './projects.css'

const Projects = () => {

  return (
    <div className='project'>
      { projects.map((project, _index) => (
        <a key={_index} className="project__link" href={project.url} target='_blank' rel="noreferrer">
          <h2 className="project__title">{project.name}</h2>
          <p>↗</p>
        </a>
      ))
      }
    </div>
  )
}
export default Projects
