import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userService"
import { User } from "../../users/User"
import './Customers.css'

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getNonStaffUsers().then((customersArr) => {
            setCustomers(customersArr)
        })
    }, [])

    return (
        <div className="customers">
            {customers.map((customerObj) => {
                return <User user={customerObj}/>
            })}
        </div>
    )
}