import React from 'react'
import { Link } from 'react-router-dom'
import titleize from 'titleize'
import CommentsContainer from '../comments/comments_container'
import Loading from '../loader'

class MessageShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, createdAt: '', updatedAt: '', author: null }
  }

  componentDidMount(){
    this.setState({ loading: true })
    this.props.fetchProject(this.props.projectId).
      then(res => this.props.fetchMessage(this.props.messageId)).
      then(res => {
        this.setState({
          createdAt: (new Date(res.message.createdAt)).toDateString(),
          updatedAt: (new Date(res.message.updatedAt)).toDateString(),
        })
        return this.props.fetchUser(res.message.authorId)
      }).
      then(res => this.setState({ author: res.user }))
  }

  componentWillReceiveProps(newProps){
    setTimeout(() => this.setState({ loading: false }), 750)
  }

  render(){
    if(!this.props.message || this.state.loading){
      return (<Loading />)
    } else {
      return (
        <div className='tool-page'>
          <header>
            <Link to={`/${this.props.currentUserId}/projects/${this.props.projectId}`}>
              <span>{this.props.project.name}</span>
            </Link>
             >
            <Link to={`/${this.props.currentUserId}/projects/${this.props.projectId}/messages`}>
              <span>Message Board</span>
            </Link>
             > {this.props.message.title}
          </header>
          <div className='main-tool'>
            { this.props.currentUserId == this.props.message.authorId ? <Link
              to={`/${this.props.currentUserId}/projects/${this.props.projectId}/messages/${this.props.messageId}/edit`}
              className='edit btn btn-normal'>Edit</Link> : <span></span> }
            <div className='message-details'>
             <h3>{ this.props.message.messageType === '' || this.props.message.messageType === 'something' ? 'Message' : `${titleize(this.props.message.messageType)}`}
             {` by `}
             { this.state.author.name }
             {` on `}
             { this.state.createdAt }</h3>
            </div>
            <div className='message-show'>
              <h1>{this.props.message.title}</h1>
              <p>{this.props.message.body}</p>
              <h5 className='posting'>
                {
                  this.state.createdAt === this.state.updatedAt ?
                    `Posted on ${this.state.createdAt}` : `Updated on ${this.state.updatedAt}`
                }
              </h5>
            </div>
          </div>
          <CommentsContainer />
        </div>
      )
    }
  }
}

export default MessageShow
