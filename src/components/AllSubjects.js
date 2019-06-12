import React, { Component } from 'react';
import { connect } from 'react-redux'
import {allSubjects, nestedSubjects} from '../converted.js'
import Category from './Category'
import {select, unSelect} from '../actions/select'
import Selected from "./Selected.js"


class AllSubjects extends Component {

  handleSubmit = e => {
      alert(this.props.selected)
  }

  onSubjectSelect = (allChildrenIds, id, parentIds, is_checked) => {
    const withChildrenIds = allChildrenIds.concat(id)
    const withParentIds = withChildrenIds.concat(parentIds)

    if (is_checked) {
      const cleanedIds = this.cleanDublicates(withChildrenIds)
      this.props.select(cleanedIds)
    }
    else {
    this.props.unSelect(withParentIds)
  }}

  cleanDublicates = (update) => {
    return update.filter(item => !this.props.selected.includes(item))
  }

  cleanAll = () => {
    this.props.unSelect(this.props.selected)
  }

renderCategories = (subject, index) => {
    return <
      Category
      subject={subject}
      id={subject.id}
      onSubjectSelect={this.onSubjectSelect}
      key={index}/>
    }

  render() {
    return (
      <div>
        <Selected data={allSubjects}/>
        <form>
          <fieldset>
            <div>
            <button
              type="submit"
              onClick={this.cleanAll}>
              Clean All
            </button>

              <button
                type="submit"
                onClick={this.handleSubmit}>
                Get materials of selected subjects
              </button>
            </div>
            {nestedSubjects.map(this.renderCategories)}
          </fieldset>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selected: state.selected
})

export default connect(mapStateToProps, {select, unSelect})(AllSubjects)
