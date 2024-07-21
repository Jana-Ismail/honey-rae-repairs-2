import { useState, useEffect } from "react"
import "./Employees.css"
import { getStaffUsers } from "../../services/userService"
import { User } from "../users/User"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getStaffUsers().then((staffUsers) => {
            setEmployees(staffUsers)
        })
    }, [])

    return (
        <div className="employees">
            {employees.map((employeeObj) => {
                return <User user={employeeObj} key={employeeObj.id}/>
            })}
        </div>
    )
}