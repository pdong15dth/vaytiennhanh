export default function ErrorValid(message) {
    if (message !== "") {
        return (
            <div
                className="alert alert-danger"
                style={{ margin: "10px 0", padding: "0 5px" }}
                role="alert">
                <i
                    className="fa fa-times"
                    style={{ padding: "0 5px 0 0" }}
                    aria-hidden="true"
                ></i>
                {message}
            </div>
        );
    } else {
        return <></>;
    }
}
