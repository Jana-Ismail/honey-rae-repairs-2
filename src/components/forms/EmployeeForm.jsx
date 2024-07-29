import { useEffect, useState } from "react"
import { getEmployeeByUserId, updateEmployee } from "../../services/employeeService"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = ( {currentUser} ) => {
    const [employee, setEmployee] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getEmployeeByUserId(currentUser.id).then(data => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
        })
    }, [currentUser])

    const handleSave = (event) => {
        event.preventDefault()

        const employeeObj = {
            id: employee.id,
            rate: employee.rate,
            specialty: employee.specialty,
            userId: currentUser.id
        }

        updateEmployee(employeeObj).then(() => {
            navigate(`/employees/${currentUser.id}`)
        })
    }
    
    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Specialty:</label>
                    <input 
                        type="text"
                        required
                        className="form-control"
                        value={employee.specialty}
                        onChange={(e) => {
                            const copy = {...employee}
                            copy.specialty = e.target.value
                            setEmployee(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Hourly Rate:</label>
                    <input 
                        type="number"
                        required
                        className="form-control"
                        value={employee.rate}
                        onChange={(e) => {
                            const copy = {...employee}
                            copy.rate = e.target.value
                            setEmployee(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-primary" onClick={handleSave}>Save Profile</button>
                </div>
            </fieldset>

        </form>
    )
}