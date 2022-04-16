module.exports.handleForm = function (e, func) {
    e.preventDefault();
    func();
}

module.exports.headerConfig = () => {
    const token = sessionStorage.getItem("token") || '';
    return {
        "authorization": token,
    }
}