import { apiPath } from './consts.js';
export async function SQL(q) {
    const response = await fetch(`${apiPath}lazy.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': '4701', 
        },
        body: JSON.stringify({
            query: q
        })
    });

    if (!response.ok) {
        throw { success: false, error: response.statusText }; 
    }
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        throw { success: false, error: error };
    }
}
export async function SQLupdate(q) {
    const response = await fetch(`${apiPath}lazy.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': '4701', 
        },
        body: JSON.stringify({
            query: q
        })
    });

    if (!response.ok) {
        throw { success: false, error: response.statusText }; 
    }
    
    return { success: true, response: 'success' };
}

export function getLS() {
    if (!localStorage.getItem('[tutorino]')) {
        localStorage.setItem('[tutorino]', JSON.stringify({}));
    }
    return JSON.parse(localStorage.getItem('[tutorino]'));
}
export function setLS(data) {
    localStorage.setItem('[tutorino]', JSON.stringify(data));
}