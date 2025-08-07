import Note from './Note'

const PersonList = ({ nameToShow, triggerDeletion}) => {
    return (
        <div>
          <ul>
            {nameToShow.map(person => <Note 
            key={person.id} 
            content={person} 
            triggerDeletion={() => triggerDeletion(person.id)}/>)}
            
          </ul>
        </div>
    )
}

export default PersonList