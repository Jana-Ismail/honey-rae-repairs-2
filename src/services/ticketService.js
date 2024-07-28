export const getAllTickets = () => {
    return fetch('http://localhost:8088/serviceTickets?_embed=employeeTickets').then(res => res.json())
}

export const assignEmployeeTicket = (employeeTicket) => {
    return fetch(
        `http://localhost:8088/employeeTickets`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeTicket)
        }
    )
}

export const updateServiceTicket = (closedTicket) => {
    return fetch(
        `http://localhost:8088/serviceTickets/${closedTicket.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(closedTicket)
        }
    )
}