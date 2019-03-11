import React from 'react';
import PropTypes from 'prop-types';
import './RepList.scss';

const RepList = ({ reps, showDetails }) => (
    <div className="list-cont">
        <h1 className="thin">
            List /
            <span className="blue">Representatives</span>
        </h1>
        <div className="list-header">
            <h4>Name</h4>
            <h4>Party</h4>
        </div>
        <div className="scroll">
            {reps && reps[0] && reps.map(rep => (
                <div className="list-data" key={rep.phone}>
                    <div
                        className="pointer"
                        onClick={(e) => { showDetails(e.target.innerText); }}
                        onKeyDown={(e) => { showDetails(e.target.innerText); }}
                        role="button"
                        tabIndex={-1}
                    >
                        {rep.name}
                    </div>
                    <h4>
                        {rep.party}
                    </h4>
                </div>
            ))}
        </div>
    </div>
);

RepList.defaultProps = {
    reps: [],
};

RepList.propTypes = {
    showDetails: PropTypes.func.isRequired,
    reps: PropTypes.arrayOf(PropTypes.object),
};

export default RepList;
