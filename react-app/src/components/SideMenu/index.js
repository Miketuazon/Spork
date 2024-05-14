import "./SideMenu.css"

const SideMenu = () => {

    return (
        <>
            <div className="sideMenu">
                <ul className="categoriesSideMenu">
                    <div className="sporkLogoSide"></div>
                    <div className="HomeButton">
                        <h1 className="sporkLogoSideMenu">Spork</h1>
                    </div>
                    <li className="homeDropdown">
                        <div className="sideIcon">
                            <i class="fa fa-home" aria-hidden="true"></i>
                        </div>
                        <div className="sideTitle">Home</div>
                    </li>
                    <li className="accountDropdown">
                        <div className="sideIcon">
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </div>
                        <div className="account">
                            Account
                            <div><i class="fa fa-caret-down" aria-hidden="true"></i></div>
                        </div>
                    </li>
                </ul>
                <div className="createPostButtonContainer">
                    <button className="createPostButton">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                        Create
                    </button>
                </div>
            </div>
        </>
    )
}

export default SideMenu
