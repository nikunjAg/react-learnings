


const origFetch = window.fetch;

window.reqInterceptor = async function(...args) {
    console.log('Request Intercepted');

    if (typeof args[0] === 'object') {
        args[0] = {
            ...(args[0] || {}),
            headers: {
                ...(args[0].headers || {}),
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }
    } else {
        args[1] = {
            ...(args[1] || {}),
            headers: {
                ...(args[1]?.headers || {}),
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }
    }

    return args;
};

window.resInterceptor = async function(response) {
    console.log('Response Intercepted');

    if (!response.ok) {
        if (response.status >= 400 && response.status <= 499) {
            return Promise.reject(response);
        }
    }
    
    return response.json();
};


/**
 * 
 * Exposes a custom fetch with reqInterceptor and resInterceptors already configured
 * 
 * @param  {...any} args - Arguments for the Javascript fetch function 
 * @returns {Promise} - Returns the result of the fetch call inside a promise
 */
const customFetch = async function(...args) {
    
    const updatedArgs = await window.reqInterceptor(...args);

    console.log('Sending Request...');
    const res = await origFetch(...updatedArgs);
    console.log('API Responded :)');
    return window.resInterceptor(res);
};

// 200
customFetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(console.log)
    .catch(console.dir);

// 404
// customFetch('https://jsonplaceholder.typicode.com/tooos/1')
//     .then(console.log)
//     .catch(console.dir);

// Failure
// customFetch('https://jsonplacehol.typicode.com/tooos/1')
//     .then(console.log)
//     .catch(console.dir);

export default customFetch;