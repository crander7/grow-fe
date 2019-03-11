import React, { Component } from 'react';
import DropDown from '../Dropdown/Dropdown';
import Header from '../Header/Header';
import RepDetails from '../RepDetails/RepDetails';
import RepsList from '../RepList/RepList';
import { states, repTypes, territories } from '../../optionsData';

import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRep: {},
            type: '',
            selectedState: '',
            noSenator: false,
            repList: []
        }
    }

    handleDropdown = (selection) => {
        if (selection.length === 1) {
            const type = Number(selection) ? 'representatives' : 'senators';
            this.setState({
                type,
                repList: [],
                activeRep: {}
            });
        } else {
            const selectedState = selection;
            const noSenator = territories.some(st => st.shortCode === selection);
            this.setState({
                selectedState,
                noSenator,
                repList: [],
                activeRep: {}
            });
        }
    }

    handleRepSelect = (selection) => {
        const { repList } = this.state;
        let activeRep = null;
        repList.forEach((r) => {
            if (r.name === selection) activeRep = r;
        });
        console.log('re', activeRep);
        this.setState({ activeRep });
    }

    handleSubmit = async () => {
        const { type, selectedState, noSenator } = this.state;
        if (!type || !selectedState) return alert('You must select a representative type and state!');
        if (noSenator && type === 'senators') {
            let name;
            territories.forEach((t) => {
                if (t.shortCode === selectedState) name = t.name;
            })
            return alert(`${name} has no Senators. Try searching representatives instead.`);
        }
        let error;
        let res;
        try {
            res = await fetch(`/${type}/${selectedState}`);
            res = await res.json();
        } catch (e) {
            error = true;
        }
        if (error) {
            alert('Sorry we couldn\'t make you request at this time');
            return this.setState({ repList: [], activeRep: {} });
        }
        this.setState({ repList: res.results });
    }

    render() {
        const {
            type,
            activeRep,
            repList
        } = this.state;
        return (
            <div className="App">
                <Header />
                <div className="search-cont">
                    <DropDown options={repTypes} handleChange={this.handleDropdown} />
                    <DropDown options={states} handleChange={this.handleDropdown} />
                    <button
                        className="pointer"
                        type="button"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </button>
                </div>
                <div className="data-disp">
                    <RepsList reps={repList} showDetails={this.handleRepSelect} />
                    <RepDetails rep={activeRep} repType={type} />
                </div>
            </div>
        );
    }
}

export default App;
