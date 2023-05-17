export class AddressModel {

    constructor() {
        this.address = '';
        this.city = '';
        this.postCode = '';
        this.country = '';
    }

    address: string;
    city: string;
    postCode: string;
    country: string;
}

const parseAddress = (text: string) => {
        let splitted = text.split(',');

        let address = null;

        if (splitted.length === 3) {

            address = new AddressModel();
            
            address.address = splitted[0];
            address.country = splitted[2].trim();

            let trimmed = splitted[1].trim();

            const endOfPostCode = splitted[1].trim().indexOf(' ');

            //Wola Chynowska 2, 05-530, Polska
            if (endOfPostCode === - 1) {
                const endOfCity = splitted[0].lastIndexOf(' ');

                address.city = splitted[0].slice(0, endOfCity);
                address.postCode = trimmed;
            }
            //Ogrodowa 24, 05-650 Wola Chynowska, Polska
            else {
                address.postCode = trimmed.slice(0, endOfPostCode);
                address.city = trimmed.slice(endOfPostCode + 1);
            }
        };
        
        return address;
}

export default parseAddress;