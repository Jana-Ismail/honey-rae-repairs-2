import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeeByUserId } from "../../services/employeeService.js"
import "./Employees.css"

export const EmployeeDetails = () => {
    const { employeeUserId } = useParams()
    const [ employee, setEmployee ] = useState([])

    const getEmployee = () => {
        getEmployeeByUserId(employeeUserId).then((data) => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
        })
    }

    useEffect(() => {
        getEmployee()
    }, [])

    return (
        <section className="employee">
            <header className="employee-header">{employee.user?.fullName}</header>
            <div>
                <span className="employee-info">Email : </span>
                {employee.user?.email}
            </div>
            <div>
                <span className="employee-info">Rate : </span>
                ${employee.rate} / hr
            </div>
            <div>
                <span className="employee-info">Specialty : </span>
                {employee.specialty}
            </div>
        </section>
    )
}