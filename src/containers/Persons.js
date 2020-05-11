import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import {connect} from 'react-redux';

class Persons extends Component {
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onPersonAdded} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onPersonDeleted(person.id)}/>
                ))}
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log('mapStateToProps');
    return{
        persons:state.persons
    }
}
const mapDispatchToProps = dispatch => {
    console.log('mapDispatchToProps');
    return{
        onPersonAdded: (name,age) => dispatch({type: 'ADD_PERSON', personData: {name:name, age:age}}),
        onPersonDeleted: (id) => dispatch({type: 'DELETE_PERSON',personId:id})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Persons);