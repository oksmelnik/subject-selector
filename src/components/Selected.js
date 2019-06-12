import React, { Component } from 'react';
import { connect } from 'react-redux'
import {select, unSelect} from '../actions/select'
import {allSubjects} from '../converted.js'

class Selected extends Component {

  onDelete = event => {
    const {id} = event.target
    const subject = allSubjects.find(x => x.id == id)
    const allIds = [...this.allParents(subject), id]
    this.props.unSelect(allIds)
  }

  allParents = (subject) => {
    let result = []
    if (subject.parent_subject_id != 0) {
      const parent = allSubjects.find(x => x.id == subject.parent_subject_id)
      const parents = [...this.allParents(parent), parent.id]
      return parents
    }
    return result
  }

  renderBoxItem =(item)=> {
    const subject = allSubjects.find(x => x.id == item)
    return (
    <div className="boxItem">
      <div className="boxItem">{subject.subject}</div>
      <div
        className="menu"
        id={item}
        onClick={this.onDelete}>
        X
      </div>
    </div>)
  }

  render() {
    const {selected} = this.props

    return (
      <div className="selected-box">
        {selected.map(this.renderBoxItem)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selected: state.selected
})

export default connect(mapStateToProps, {unSelect})(Selected)
