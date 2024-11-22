import api from "../services/api"

class Util {

    static api_base_url(op = false) {
        return `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/${op ? op : ''}`
    }

    static serverBaseURL() {
        return `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}`
    }

    static async isAuthenticated() {
        if (localStorage.length === 0) return false

        const token = localStorage.getItem('@DataProcess:token')

        if (typeof token === undefined || token === null || token === '') return false

        const localUser = JSON.parse(localStorage.getItem('@DataProcess:user'))

        if (!localUser || localUser === '' || typeof localUser !== 'object' || !localUser.email) return false

        return true
    }
    static async verifyMailHash(urlHash) {

        // TODO!!
        // if (!urlHash) return false
        // try {
        //     const response = await api.post('/verfiy-url-hash', { not_middleware: true }, { headers: { url_hash: urlHash } })

        //     return response !== undefined && response !== null && !response.Error ? true : false

        // } catch ({ response }) {
        //     console.log(response)
        //     alert(response.data.Error)
        //     return false
        // }

    }

    static getUser() {
        const user = JSON.parse(localStorage.getItem('@DataProcess:user'))
        return !user ? false : user;
    }

    static getApiAuthHeader() {
        return {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem('@DataProcess:token')
            }
        }
    }

    static convertDateToISO(dateString) {
        const [day, month, year] = dateString.split("/");

        const date = new Date(Date.UTC(year, month - 1, day));

        return date.toISOString();
    }


    static generateColor() {
        let randomColorString = "#";
        const arrayOfColorFunctions = "0123456789abcdef";
        for (let x = 0; x < 6; x++) {
            let index = Math.floor(Math.random() * 16);
            let value = arrayOfColorFunctions[index];

            randomColorString += value;
        }
        return randomColorString;
    };

    static BRL (num){
        if(typeof num != 'number')
            return ''
        return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}
export default Util