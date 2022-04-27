import React from 'react'
//Navbar is used as the main component which carries important buttons and their links for their functionality
function Navbar() {
    //It takes to the login page 
    const user = JSON.parse(localStorage.getItem('currentUser'))
    function logout(){
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }
    //the implementation of navigation bar with tooggle type and a dropdown menu

    //Here if the user is not logged in the navigation bar shows thw option of login and register.

    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="/home">Captains Quarters   </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"><i class="fas fa-bars" style={{color:'white'}}></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-5">
    
                        {user ? (
                            <>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                       <i className='fa fa-user'></i>{user.name}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="/profile">Profile</a>
                                        <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                                        <a class="dropdown-item" href="/chat">Chat</a>
                                        <a class="dropdown-item" href="/inquiry">Inquiry</a>
                                        <a class="dropdown-item" href="/feedback">Feedback</a>

                                        

                                        
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <li class="nav-item">
                                    <a class="nav-link" href="/register">
                                        Register
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/login">
                                        Login
                                    </a>
                                </li>
                            </>

                        )}

                    </ul>
                </div>
            </nav>
        </div>

    )
}

export default Navbar