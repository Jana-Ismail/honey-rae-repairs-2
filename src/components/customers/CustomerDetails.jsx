import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCustomerByUserId } from "../../services/customerService"
import "./Customers.css"

export const CustomerDetails = () => {
const { customerUserId } = useParams()
const [customer, setCustomer] = useState([])

const getCustomer = () => {
    getCustomerByUserId(customerUserId).then((data) => {
        const customerObj = data[0]
        setCustomer(customerObj)
    })
}

useEffect(() => {
    getCustomer()
}, [customerUserId])

    return (
        <section className="customer">
            <header className="customer-header">{customer.user?.fullName}</header>
            <div>
                <span className="customer-info">Email : </span>
                {customer.user?.email}
            </div>
            <div>
                <span className="customer-info">Address : </span>
                {customer.address}
            </div>
            <div>
                <span className="customer-info">Phone Number : </span>
                {customer.phoneNumber}
            </div>
        </section>
    )
}