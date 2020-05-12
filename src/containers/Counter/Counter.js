import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/Action';

import * as actionCreators from '../../store/actions/Action';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0,
        results: []
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddFiveCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubFiveCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult =>(
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

/*it is used to store instruction how state managed by redux should be
mapped with props you can use in this container,it will return a Js object 
which is a map of prop name and slice of statestored in redux*/

const mapStateToProps = state => {
    return {    
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
}

/*the dispatch will call dispatch of store behind the scene and it will return 
a javascript object where we can define some prop name which will hold a 
reference to function which is executed to dispatch a action*/

const mapDispatchToProps = dispatch => {
    return{
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddFiveCounter: () => dispatch(actionCreators.add(5)),
        onSubFiveCounter: () => dispatch(actionCreators.subtract(5)),
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.remove(id))

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Counter);

/*connect is not really a higher order component it is a function which 
return a function which takes a component as an input*/