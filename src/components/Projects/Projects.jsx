import { projects } from '../../utils/constants'
import './projects.css'

const Projects = () => {

  return (
    <div className='projects'>
      { projects.map((project, _index) => (
        <div key={_index} className='project__content'>
          <h2 className="project__title">{project.name}</h2>
          <a className="project__link" href={project.url}>
            ↗
          </a>
        </div>
      ))
      }
    </div>
  )
}
export default Projects
