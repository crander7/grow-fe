import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

const DropDown = ({ options, handleChange }) => (
    <div className="drop">
        <select
            className="drop-down pointer"
            onChange={(e) => { handleChange(e.target.value); }}
        >
            <option value="" />
            {options.map(option => (
                <option
                    className="highlight"
                    value={option.id}
                    key={option.id}
                >
                    {option.name}
                </option>
            ))}
        </select>
    </div>
);

DropDown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default DropDown;
