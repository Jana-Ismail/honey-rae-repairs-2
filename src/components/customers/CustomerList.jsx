import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService"
import { User } from "../users/User"
import './Customers.css'
import { Link } from "react-router-dom"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getNonStaffUsers().then((customerUsersArr) => {
            setCustomers(customerUsersArr)
        })
    }, [])

    return (
        <div className="customers">
            {customers.map((userObj) => {
                return (
                    <Link to={`/customers/${userObj.id}`}>
                        <User user={userObj}/>
                    </Link>
                )
            })}
        </div>
    )
}