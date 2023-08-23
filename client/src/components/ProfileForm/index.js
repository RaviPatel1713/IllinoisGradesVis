
import React from 'react';

import "./ProfileForm.css"

export const Form = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input className="form-control" id="firstname" />
            </div>
            <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input className="form-control" id="lastname" />
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};
export default Form;