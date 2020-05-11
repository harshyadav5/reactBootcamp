const initialState={
    persons: []
}
const reducer = (state=initialState,action) => {
    switch(action.type){
        case 'DELETE_PERSON':
            console.log('DELETE_PERSON');
            const updatedPersons = state.persons.filter(person => person.id !== action.personId)
            return{
                ...state,
                persons: updatedPersons
            }
    }
    return state
}
export default reducer;