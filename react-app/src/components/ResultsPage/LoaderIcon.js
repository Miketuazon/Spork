import './LoaderIcon.css'

function LoaderIcon() {
    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");

        loader.classList.add("loader-hidden");

        loader.addEventListener("transitionend", () => {
            document.body.removeChild("loader");
        })
    })

    return (
        <h2 className='loader'>Loading...</h2>
    )
}

export default LoaderIcon
