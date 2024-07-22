import { useState, useEffect } from "react"
import "./Employees.css"
import { getStaffUsers } from "../../services/userService"
import { User } from "../users/User"
import { Link } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getStaffUsers().then((staffUsers) => {
            setEmployees(staffUsers)
        })
    }, [])

    return (
        <div className="employees">
            {employees.map((userObj) => {
                return (
                    <Link to={`/employees/${userObj.id}`}>
                        <User user={userObj} key={userObj.id}/>
                    </Link>
                )
            })}
        </div>
    )
}