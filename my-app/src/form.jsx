import React from 'react'
import { useState } from "react";

function Form() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [staff, setStaff] = useState("Student")
    const [phonetype, setPhoneType] = useState("");
    const [signup, setSignup] = useState(false)
    const [bio,setBio] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = field => {
        return (e) => {
            switch(field) {
                case "name":
                    setName(e.target.value);
                break;

                case "email":
                    setEmail(e.target.value);
                break;

                case "phonenumber":
                    setPhoneNumber(e.target.value);
                break;
                case "bio":
                    setBio(e.target.value);
                break;
                case "staff":
                    setStaff(e.target.value);
                break;
                case "signup":
                    setSignup(e.target.checked);
                break;

                default:
                    break;
            }
        }
    }

    const validate = () => {
        let errors = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^\+?\d{1,3}?[-.\s]?\(?[0-9]{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

        if (name.length === 0){
            errors.push("Name cannot be empty")         
        }

        if (email.length === 0 || !emailRegex.test(email)) {
            errors.push("Email is invalid")
        }

        if (phonenumber.length && !phoneNumberRegex.test(phonenumber)) {
            errors.push("Phone number is not formatted correctly")
        }

        if (phonenumber.length && !phonetype){
            errors.push("Choose a phone type")
        }
        
        if (bio.length > 280) {
            errors.push("Your bio is too long")
        }
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = validate();

        if (errors.length > 0) {
            setErrorMessages(errors);
        }else {
            let form = {
                name,
                email,
                phonenumber,
                staff,
                phonetype,
                signup,
                bio,
                signup
            };
            console.log(form)
        }
    }

    const showErrors = () => {
        if(!errorMessages.length) {
            return null;
        }else{
            return (
                <ul>
                    {errorMessages.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            )
        }
    }

    return (
        <>
        {showErrors()}
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder="name" value={name} onChange={handleChange('name')}/>
                <br />
            <input type="text" placeholder="email" value={email} onChange={handleChange('email')}/>
                <br />
            <input type="text" placeholder="phone-number" value={phonenumber} onChange={handleChange('phonenumber')}/>
                <br />
            <select name="phone-type" id="phone-type" onChange={(event) => setPhoneType(event.target.value)}>
                <option value=""></option>
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="Mobile">Mobile</option>
            </select>
                <br />
            <label>Instructor</label>
            <input type="radio" name="staff" value="Instructor" checked={staff === "Instructor"} onChange={handleChange('staff')}></input>
            <label>Student</label>
            <input type="radio" name="staff" value="Student" checked={staff ==="Student"} onChange={handleChange('staff')}></input>
                <br />
            <input className='bio' type="textarea" placeholder="Bio" value={bio} onChange={handleChange('bio')}/>
                <br />
            <label>Sign up!</label>
            <input type="checkbox" checked={signup} onChange={handleChange('signup')}/>
                <br />
            <button>Submit!</button>
        </form>
        </>
    )
        
}

export default Form;