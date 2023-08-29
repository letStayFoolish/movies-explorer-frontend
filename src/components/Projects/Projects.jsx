import { projects } from '../../utils/constants'
import './projects.css'

const Projects = () => {

  return (
    <div className='projects'>
      { projects.map((project, _index) => (
        <div key={_index} className='project__content'>
          <h2 className="project__title puff-in-center">{project.name}</h2>
          <a className="project__link" href={project.url} target='_blank' rel="noreferrer">
            ↗
          </a>
        </div>
      ))
      }
    </div>
  )
}
export default Projects
