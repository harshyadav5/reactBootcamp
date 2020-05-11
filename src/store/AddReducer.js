const initialState = {
    persons: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PERSON':
            console.log('ADD_PERSON');
            const newPerson = {
                id: Math.random(),
                name: action.personData.name,
                age: action.personData.age
            }
            console.log(state.persons.concat(newPerson))
            return {
                persons: state.persons.concat(newPerson)
            }
            case 'DELETE_PERSON':
                console.log('DELETE_PERSON');
                const updatedPersons = state.persons.filter(person => person.id !== action.personId)
                return {
                    ...state,
                    persons: updatedPersons
                }
    }
    return state
}
export default reducer;