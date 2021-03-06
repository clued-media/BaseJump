import React from 'react'

class TodoListForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      description: '',
      project_id: this.props.project.id,
      author_id: this.props.currentUser.id
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleErrors = this.handleErrors.bind(this)
    this.update = this.update.bind(this)
    this.toggleHide = this.toggleHide.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.createTodoList( this.state ).
    then( this.setState( {
      title: '',
      description: '',
      project_id: this.props.project.id,
      author_id: this.props.currentUser.id
    } )).
    fail(res => this.handleErrors(res.responseJSON.errors))
  }

  handleErrors(err){
    $(`#new-todolist-${this.props.project.id} #title`).addClass('invalid-input')
  }

  handleCancel(e){
    $(`#new-todolist-${this.props.project.id} #title`).removeClass('invalid-input')
    e.preventDefault()
    this.setState( {
      title: '',
      description: '',
      project_id: this.props.project.id,
      author_id: this.props.currentUser.id
    } )
    this.toggleHide()
  }

  update(field){
    return (e) => {
      $(`#new-todolist-${this.props.project.id} #title`).removeClass('invalid-input')
      let value = e.target.value
      this.setState({ [field]: value })
    }
  }

  toggleHide(){
    $(`#add-todolist-${this.props.project.id}`).removeClass('hidden')
    $(`#new-todolist-${this.props.project.id}`).addClass('hidden')
  }


  render(){
    return (
      <div className='tool-form todolist hidden' id={`new-todolist-${this.props.project.id}`}>
        <form>
          <div className='input-fields'>
            <input type='text' id='title' placeholder='Name this list...'
              onChange={this.update('title')} value={this.state.title} />
            <input type='text' placeholder='Add a extra details...'
              onChange={this.update('description')} value={this.state.description} />
          </div>
          <div className='submit-buttons'>
            <input type='submit' value='Add this list'
              className='btn btn-submit' onClick={this.handleSubmit}/>
            <input type='submit' value='Cancel'
              className='btn btn-cancel' onClick={this.handleCancel}/>
          </div>
        </form>
      </div>
    )
  }
}

export default TodoListForm
