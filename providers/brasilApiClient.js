import axios from "axios";

export async function getAddressByPostalCode(postalCode) {
    /*
        {
            "cep": "89010025",
            "state": "SC",
            "city": "Blumenau",
            "neighborhood": "Centro",
            "street": "Rua Doutor Luiz de Freitas Melro",
            ...
        }
     */
    try {
        const {data: {cep, state, city, neighborhood, street}} =
            await axios.get(`https://brasilapi.com.br/api/cep/v2/${postalCode}`);

        return {cep, state, city, neighborhood, street};

    } catch (error) {
        if (error.status === 404)
            throw new Error("Postal code doesn't exists.");
        else
            throw new Error("Something went wrong when searching address.");
    }

}