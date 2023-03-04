import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ProjectItem from '../ProjectItem'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiUrl = 'https://apis.ccbp.in/ps/projects?category='

class ProjectsShow extends Component {
  state = {
    isLoading: true,
    projectsData: [],
    selectedType: 'ALL',
    statusFail: false,
  }

  componentDidMount() {
    this.getProjects(categoriesList[0].id)
  }

  setProjects = (fetchedData, loadingStatus) => {
    this.setState({projectsData: fetchedData, isLoading: loadingStatus})
  }

  setLoading = loadingStatus => {
    this.setState({isLoading: loadingStatus})
  }

  getProjects = async () => {
    const {selectedType} = this.state

    this.setLoading(true)
    // console.log(selectedType)

    const response = await fetch(`${apiUrl}${selectedType}`)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.projects.map(eachProject => ({
        id: eachProject.id,
        name: eachProject.name,
        imageUrl: eachProject.image_url,
      }))
      //   console.log(fetchedData.projects)
      this.setProjects(updatedData, false)
    } else {
      this.setState({statusFail: true})
    }
  }

  onChangeSelect = event => {
    this.setState({selectedType: event.target.value}, this.getProjects)
  }

  onClickRetry = () => {
    this.getProjects()
  }

  renderProjectsList = () => {
    const {projectsData} = this.state

    return (
      <ul className="projects-list">
        {projectsData.map(project => (
          <ProjectItem key={project.id} projectData={project} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderCategoryFilterList = () => {
    const {selectedType} = this.state
    console.log(selectedType)

    return (
      <div className="select-container">
        <select
          value={selectedType}
          className="select"
          onChange={this.onChangeSelect}
        >
          {categoriesList.map(each => (
            <option key={each.id} value={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  render() {
    const {isLoading, statusFail} = this.state

    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="logo"
          />
        </div>
        <div className="projects-view">
          {statusFail
            ? this.renderFailureView()
            : this.renderCategoryFilterList()}
          {isLoading ? this.renderLoader() : this.renderProjectsList()}
        </div>
      </div>
    )
  }
}

export default ProjectsShow
