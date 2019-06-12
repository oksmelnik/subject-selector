import data from './data/subjects.json'


function addChildrenPlaceholders(input) {
  let outcome = input.map(item => {
    let newItem = {...item, ...{"children": []}, ...{"children_id": []}
    }
    return newItem
  })
  return outcome
}

let dataWithPlaceholders = addChildrenPlaceholders(data)

function addChildren(item) {
  const output = item
  output.map(item => {
    if(item.parent_subject_id != 0) {
      output.map(parent => {
        if (parent.id == item.parent_subject_id){
          parent.children.push(item)
          parent.children_id.push(item.id)

          if(parent.parent_subject_id !== 0) {
            output.map(parentUp => {
              if (parentUp.id == parent.parent_subject_id) {
                parentUp.children_id.push(item.id)
              }
            })
          }
        }
      })
    }
  })
  return output
}

const allSubjects = addChildren(dataWithPlaceholders)
const nestedSubjects = allSubjects.filter(item => item.parent_subject_id == 0)
export {allSubjects, nestedSubjects}
