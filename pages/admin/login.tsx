
export default function Index() {

    return (
        <form>
            <div>
                <label htmlFor="username">Tài khoản</label>
                <input type="text" name="username" id="username" />
            </div>
            <div>
                <label htmlFor="password">Mật khẩu</label>
                <input type="text" name="password" id="password" />
            </div>
        </form>
    )
}