export class Proveedor {
    constructor(id, empresaProveedora, nombreVendedor, telefonoCelular, email, notas) {
        this._id = id;
        this.empresaProveedora = empresaProveedora;
        this.nombreVendedor = nombreVendedor;
        this.telefonoCelular = telefonoCelular;
        this.email = email;
        this.notas = notas;
    }

    get id() { 
        return this._id; 
    }

    get empresaProveedora() { 
        return this._empresaProveedora; 
    }
    set empresaProveedora(value) { 
        if (!value || typeof value !== 'string') {
            throw new Notification('../../img/emojis/pare.png', 'El campo no puede quedar vacío', 'error');
        }
        this._empresaProveedora = value; 
    }

    get nombreVendedor() { 
        return this._nombreVendedor; 
    }
    set nombreVendedor(value) { 
        if (!value || typeof value !== 'string') {
            throw new Notification('../../img/emojis/pare.png', 'El campo no puede quedar vacío', 'error');
        }
        this._nombreVendedor = value; 
    }

    get telefonoCelular() { 
        return this._telefonoCelular; 
    }
    set telefonoCelular(value) { 
        const telefonoRegex = /^\d{10,}$/; //para que tenga 10 o más dígitos
        if (!telefonoRegex.test(value)) {
            throw new Notification('../../img/emojis/pare.png', 'Te faltan dígitos', 'error');
        }
        this._telefonoCelular = value; 
    }

    get email() { 
        return this._email; 
    }
    set email(value) { 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Notification('../../img/emojis/pare.png', 'El mail no es válido', 'error');
        }
        this._email = value; 
    }

    get notas() { 
        return this._notas; 
    }
    set notas(value) { 
        this._notas = value; 
    }

    // Convierto el objeto a JSON para almacenamiento
    toJSON() {
        return {
            id: this._id,
            empresaProveedora: this._empresaProveedora,
            nombreVendedor: this._nombreVendedor,
            telefonoCelular: this._telefonoCelular,
            email: this._email,
            notas: this._notas
        };
    }

    // Método para crear una instancia de Proveedor desde un objeto JSON
    static fromJSON(json) {
        return new Proveedor(
            json.id,
            json.empresaProveedora,
            json.nombreVendedor,
            json.telefonoCelular,
            json.email,
            json.notas
        );
    }
}
