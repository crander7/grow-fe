/* eslint no-alert: 0 */
import React, { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Header from '../Header/Header';
import RepDetails from '../RepDetails/RepDetails';
import RepsList from '../RepList/RepList';
import { states, repTypes, territories } from '../../optionsData';
import './App.scss';

const App = () => {
    const [activeRep, setActiveRep] = useState({});
    const [type, setType] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [noSenator, setNoSenator] = useState(false);
    const [repList, setRepList] = useState([]);

    const handleDropdown = (selection) => {
        if (selection.length === 1) {
            setType(Number(selection) ? 'representatives' : 'senators');
        } else {
            setSelectedState(selection);
            setNoSenator(territories.some(st => st.shortCode === selection));
        }
        setRepList([]);
        setActiveRep({});
    };

    const handleRepSelect = (selection) => {
        let rep = null;
        repList.forEach((r) => {
            if (r.name === selection) rep = r;
        });
        setActiveRep(rep);
    };

    const handleSubmit = async () => {
        if (!type || !selectedState) return alert('You must select a representative type and state!');
        if (noSenator && type === 'senators') {
            let name;
            territories.forEach((t) => {
                if (t.shortCode === selectedState) ({ name } = t);
            });
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
            setRepList([]);
            return setActiveRep({});
        }
        return setRepList(res.results);
    };

    return (
        <div className="app">
            <Header />
            <div className="search-cont">
                <Dropdown options={repTypes} handleChange={handleDropdown} />
                <Dropdown options={states} handleChange={handleDropdown} />
                <button
                    className="pointer"
                    type="button"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            <div className="data-disp">
                <RepsList reps={repList} showDetails={handleRepSelect} />
                <RepDetails rep={activeRep} repType={type} />
            </div>
        </div>
    );
};

export default App;
