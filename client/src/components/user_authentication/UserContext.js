import React, {createContext} from "react"

const UserContext = createContext({})

class UserProvider extends React.Component {
    // Context state
    state = {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    }

    // Method to update state
    setUser = (user) => {
        this.setState((prevState) => ({ user }))
    }

    render() {
        const { children } = this.props
        const { user } = this.state
        const { setUser } = this

        return (
            <UserContext.Provider
                value={{
                    user,
                    setUser
                }}
            >
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserContext

export { UserProvider }