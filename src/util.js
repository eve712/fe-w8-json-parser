const _ = {
    $ : (selector, base = document) => base.querySelector(selector),
    pipe : (...fns) => arg => fns.reduce((arg, fn) => fn(arg),arg)
}

export default _;