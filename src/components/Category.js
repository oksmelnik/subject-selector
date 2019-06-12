import React, { Component } from 'react'
import { connect } from 'react-redux'
import {allSubjects} from '../converted.js'
import '../style.css'


class Category extends Component {
  state = {
    opened: false
  }

  handleSelect = event => {
    const {subject} = this.props
    const allChildrenIds = subject.children_id
    const is_checked = event.target.checked
    let allParentsIds

    if (!is_checked) {
    allParentsIds = this.allParents(subject)
    }
    this.props.onSubjectSelect(allChildrenIds, subject.id, allParentsIds, is_checked)
  }

  allParents = (subject) => {
    const result = []
    if (subject.parent_subject_id != 0) {
      const parent = allSubjects.find(x => x.id == subject.parent_subject_id)
      const parents = [...this.allParents(parent), parent.id]
      return parents
    }
    return result
  }

  handleOpen= () => {
    this.setState(
      { opened: this.state.opened === false ? true : false }
    )
  }

  subjectClassName() {
      const {subject, selected} = this.props
      let classNames = ['row']
      if (selected.includes(subject.id)) {
        classNames = classNames.concat('selected')}
      return classNames.join(' ')
  }

  renderSubcategories = (subC, index) => {
      const {selected} = this.props

      if (this.state.opened) {
      return (<
        Category
        selected={selected}
        subject={subC}
        id={subC.id}
        onSubjectSelect={this.props.onSubjectSelect}
        key={index}/>
    )}
  }

  renderSubcategoryButton = () => {
    const {subject} = this.props
    let text = this.state.opened ? "Close" : "Open"

      if (subject.children.length > 1) {
        return (
          <div
          className={this.renderBunnonClass()}
          onClick={this.handleOpen}>
          {text}
          </div>
    )
  }}

  renderBunnonClass() {
      let classNames = ['menu']
      if (this.state.opened) {
        classNames = classNames.concat('active')
      }
      return classNames.join(' ')
  }

  renderChecked() {
    const { selected, subject } = this.props
    if (selected.includes(subject.id)) {
      return true}
    return false
  }

  render () {
    const {subject, index, selected} = this.props
    return (
      <div className="category">
        <div className="row">
          <label className="container">
            <div className={this.subjectClassName()}>
              <div
                id={subject.id}
                className="sub">
                {subject.subject}
              </div>

            </div>
            <input
              type="checkbox"
              name={subject.id}
              onChange={this.handleSelect}
              id={index}
              checked={this.renderChecked()}/>
              <span className="checkmark">
              </span>

            </label>
            {this.renderSubcategoryButton()}
          </div>
        <div>
      </div>
    <div>
      {subject.children.map(this.renderSubcategories)}
    </div>
  </div>
)}}

const mapStateToProps = state => ({
  selected: state.selected
})

export default connect(mapStateToProps)(Category)
