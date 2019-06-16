const USER_TOKEN_LOCAL_STORAGE = '89h32inde&^#$I@GUBDEJFIW'
const USER_EMAIL_LOCAL_STORAGE = 'HB#*&@T$E#UDBBF&*GYDKSB('
window.todoAppState = {
    todos: [],
    editId: null,
    quill: null
}

/**
 * string komponen yang akan di render
 * @param {Array} components 
 */
function render(page, callback) {
    let components = []
    switch (page) {
        case 'login': 
            components = [page_login()]
            break
        case 'loading':
            components = [page_loading()]
            break
        case 'main': 
            components = [component_nav(), page_todoMain()]
            break
        case 'create': 
            components = [component_nav(), page_todoForm()]
            break
        case 'detail': 
            break
        default:
            break
    }
    $('#main').html(components.join('')).promise().done(callback)
}

$(document).ready(function () {
    let email = window.localStorage.getItem(USER_EMAIL_LOCAL_STORAGE) || null
    let token = window.localStorage.getItem(USER_TOKEN_LOCAL_STORAGE) || null
    render('loading')
    if (getQueryParam('code')) {
        /** login degan github */
    } else if (email && token) {
        action_listTodo()
            .then(res => {
                window.todoAppState.todos = res.data
                render('main')
                toast_success(`Welcome back!`, 'Here comes your todo list')
            })
            .catch(toast_error)
    } else {
        render('login')
    }
    console.log("ready!");
})