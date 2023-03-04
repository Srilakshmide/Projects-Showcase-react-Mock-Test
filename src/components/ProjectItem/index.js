import './index.css'

const ProjectItem = props => {
  const {projectData} = props
  const {imageUrl, name} = projectData

  return (
    <li className="project-card">
      <img src={imageUrl} alt={name} className="image" />
      <p className="title">{name}</p>
    </li>
  )
}

export default ProjectItem
