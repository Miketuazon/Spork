import "./SideMenu.css"

const SideMenu = () => {

    return (
        <>
            <div className="sideMenu">
                <ul className="categoriesSideMenu">
                    <div className="sporkLogoSide"></div>
                    <li className="HomeButton">
                        <h1 className="sporkLogoSideMenu">Spork</h1>
                    </li>
                    <li className="accountDropdown">
                        <div>Account</div>
                        <div><i class="fa fa-caret-down" aria-hidden="true"></i></div>
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
