import React, { useState } from 'react';

export default function NewAccount(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [accountType, setAccountType] = useState('E-Toll')
    const [tagAmount, setTagAmount] = useState('1')
    const [topUpAmount, setTopUpAmount] = useState('40')
    const [afterBusinessHours, setAfterBusinessHours] = useState('')
    const [businessHours, setBusinessHours] = useState('')
    const [mobile, setMobile] = useState('')

    function sendAddUserRequest(e) {
        e.preventDefault();
        debugger;
        let u = {
            customer: {
                firstName: firstName,
                lastName: lastName,
                companyName: companyName
            },
            accountType,
            tagAmount,
            topUpAmount,
            contactNumbers: {
                businessHours: businessHours,
                afterBusinessHours: afterBusinessHours,
                mobile: mobile
            }
        }

        fetch('http://localhost:4000/api/info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(u),
        })
            .then((response) => response.json())
            .then(json => {
                if (json.status == 200) {
                    props.addUser(json.data)
                    setFirstName('')
                    setLastName('')
                    setCompanyName('')
                    setAccountType('')
                    setTagAmount('')
                    setTopUpAmount('')
                    setAfterBusinessHours('')
                    setBusinessHours('')
                    setMobile('')
                }
                else {
                    alert("error")
                }
            });
    }
    return (
        <div style={{ border: '1px solid blue', padding: '5px', margin: '5px' }}> Customer Details
            <form>
                <div>
                    <input placeholder="First name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                </div>
                <div>
                    <input placeholder="Surname" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                </div>
                <div>
                    <input placeholder="Company name" onChange={(e) => setCompanyName(e.target.value)} value={companyName} />
                </div>

                <p> Account Type</p>
                <div className="radio">
                    <label >
                    <input type="radio" value="E-Toll" checked={true} onChange={(e) => setAccountType(e.target.value)} value={accountType} />
                    etoll</label>
                </div>
                <div className="radio">
                    <label >
                    <input type="radio" value="Easy Toll Manual" />
                    Easy manual</label>
                </div>
                <div className="radio">
                    <label >
                    <input type="radio" value="Easy Toll Auto" />
                    etoll</label>
                </div>
                <select onChange={(e) => setAccountType(e.target.value)} value={accountType}>
                    <option value="E-Toll" >E-Toll</option>
                    <option value="Easy Toll Manual" >Easy Toll Manual</option>
                    <option value="Easy Toll Auto" >Easy Toll Auto</option>
                </select>
                <select onChange={(e) => setTopUpAmount(e.target.value)} value={topUpAmount}>
                    <option value="40" >$40 top up</option>
                    <option value="80" >$80 top up</option>
                </select>

                <div>Amount of Tags:
                <select onChange={(e) => setTagAmount(e.target.value)} value={tagAmount}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>

                    </select>
                </div>

                <div>Contact Details
                    <input placeholder="Business hours " onChange={(e) => setBusinessHours(e.target.value)} value={businessHours} />
                    <input placeholder="After hours" onChange={(e) => setAfterBusinessHours(e.target.value)} value={afterBusinessHours} />
                    <input placeholder="Mobile Number" onChange={(e) => setMobile(e.target.value)} value={mobile} />
                </div>
                <button onClick={sendAddUserRequest}>Add Account</button>
            </form>
        </div>
    )
}
