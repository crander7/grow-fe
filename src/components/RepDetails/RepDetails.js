import React from 'react';
import PropTypes from 'prop-types';
import './RepDetails.scss';

const parseName = (name, type) => {
    if (type === 'first') return name.split(' ')[0];
    return name.split(' ').reduce((acc, n, idx) => (idx > 0 ? `${acc} ${n}` : ''), '');
};

const RepDetails = ({ rep, repType }) => (
    <div className="detail-cont">
        <h1 className="thin">
            Info
        </h1>
        <div>
            <h4>
                First Name
                {rep.name
                    ? `: ${rep.name.split(' ')[0]}`
                    : ''
                }
            </h4>
        </div>
        <div>
            <h4>
                Last Name
                {rep.name
                    ? `: ${parseName(rep.name, 'last')}`
                    : ''
                }
            </h4>
        </div>
        <div>
            <h4>
                District
                {rep.name
                    ? repType === 'representatives'
                        ? `: ${rep.district}`
                        : ': N/A'
                    : ''
                }
            </h4>
        </div>
        <div>
            <h4>
                Phone Number
                {rep.phone
                    ? `: (${rep.phone.split('-')[0]}) ${rep.phone.split('-')[1]}-${rep.phone.split('-')[2]}`
                    : ''
                }
            </h4>
        </div>
        <div>
            <h4>
                Office
                {rep.office
                    ? `: ${rep.office}`
                    : ''
                }
            </h4>
        </div>
        <div>
            <h4>
                Website
                {rep.link
                    ? (
                        <React.Fragment>
                            <span>:&nbsp;</span>
                            <a href={rep.link}>
                                <span>{rep.link ? `${rep.link}` : ''}</span>
                            </a>
                        </React.Fragment>
                    )
                    : ''
                }
            </h4>
        </div>
    </div>
);

RepDetails.defaultProps = {
    rep: {},
    repType: null
}

RepDetails.propTypes = {
    rep: PropTypes.object,
    repType: PropTypes.string
};

export default RepDetails;