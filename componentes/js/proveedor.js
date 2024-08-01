// proveedor.js
export class Proveedor {
    constructor(id, empresaProveedora, nombreVendedor, telefonoCelular, email, notas) {
        this._id = id;
        this._empresaProveedora = empresaProveedora;
        this._nombreVendedor = nombreVendedor;
        this._telefonoCelular = telefonoCelular;
        this._email = email;
        this._notas = notas;
    }

    get id() { 
        return this._id; 
    }

    get empresaProveedora() { 
        return this._empresaProveedora; 
    }
    set empresaProveedora(value) { 
        this._empresaProveedora = value; 
    }

    get nombreVendedor() { 
        return this._nombreVendedor; 
    }
    set nombreVendedor(value) { 
        this._nombreVendedor = value; 
    }

    get telefonoCelular() { 
        return this._telefonoCelular; 
    }
    set telefonoCelular(value) { 
        this._telefonoCelular = value; 
    }

    get email() { 
        return this._email; 
    }
    set email(value) { 
        this._email = value; 
    }

    get notas() { 
        return this._notas; 
    }
    set notas(value) { 
        this._notas = value; 
    }
}

let proveedores = [];
let nextId = 1;

export function crearFormularioProveedor() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'container-form-proveedor';

    const h1 = document.createElement('h1');
    h1.textContent = 'Nuevo proveedor';
    container.appendChild(h1);

    const form = document.createElement('form');
    form.className = 'form-proveedor';
    form.id = 'proveedorForm';

    const campos = [
        { id: 'empresaProveedora', placeholder: 'Empresa Proveedora', type: 'text' },
        { id: 'nombreVendedor', placeholder: 'Nombre del Vendedor/a', type: 'text' },
        { id: 'telefonoCelular', placeholder: 'Teléfono / Celular', type: 'tel' },
        { id: 'email', placeholder: 'Email', type: 'email' },
    ];

    campos.forEach(campo => {
        const input = document.createElement('input');
        input.className = 'input-proveedor';
        input.id = campo.id;
        input.placeholder = campo.placeholder;
        input.type = campo.type;
        input.required = true;
        form.appendChild(input);
    });

    const notas = document.createElement('textarea');
    notas.className = 'notas-proveedor';
    notas.id = 'notas';
    notas.placeholder = 'Notas';
    form.appendChild(notas);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group-proveedor';

    const cancelarBtn = document.createElement('button');
    cancelarBtn.id = 'cancelar';
    cancelarBtn.textContent = 'Cancelar';
    cancelarBtn.type = 'button';

    const guardarBtn = document.createElement('button');
    guardarBtn.id = 'guardar';
    guardarBtn.textContent = 'Guardar';
    guardarBtn.type = 'submit';

    buttonGroup.appendChild(cancelarBtn);
    buttonGroup.appendChild(guardarBtn);
    form.appendChild(buttonGroup);

    container.appendChild(form);
    main.appendChild(container);

    form.addEventListener('submit', handleSubmit);
    cancelarBtn.addEventListener('click', handleCancel);
}

export function handleSubmit(e) {
    e.preventDefault();

    const empresaProveedora = document.getElementById('empresaProveedora').value;
    const nombreVendedor = document.getElementById('nombreVendedor').value;
    const telefonoCelular = document.getElementById('telefonoCelular').value;
    const email = document.getElementById('email').value;
    const notas = document.getElementById('notas').value;

    //La propiedad dataset permite acceder a los atributos data-* de un elemento HTML
    const proveedorId = e.target.dataset.editingId ? parseInt(e.target.dataset.editingId) : nextId++;

    const proveedor = new Proveedor(proveedorId, empresaProveedora, nombreVendedor, telefonoCelular, email, notas);

    const index = proveedores.findIndex(p => p.id === proveedorId);
    if (index !== -1) {
        proveedores[index] = proveedor;
        console.log('Proveedor actualizado:', proveedor);
    } else {
        proveedores.push(proveedor);
        console.log('Nuevo proveedor agregado:', proveedor);
    }

    e.target.reset();
    delete e.target.dataset.editingId;

    mostrarProveedores();
}

export function handleCancel() {
    console.log('Operación cancelada');
    document.getElementById('proveedorForm').reset();
    delete document.getElementById('proveedorForm').dataset.editingId;
}

export function editarProveedor(id) {
    const proveedor = proveedores.find(p => p.id === id);
    if (proveedor) {
        if (!document.getElementById('proveedorForm')) {
            crearFormularioProveedor();
        }

        document.getElementById('empresaProveedora').value = proveedor.empresaProveedora;
        document.getElementById('nombreVendedor').value = proveedor.nombreVendedor;
        document.getElementById('telefonoCelular').value = proveedor.telefonoCelular;
        document.getElementById('email').value = proveedor.email;
        document.getElementById('notas').value = proveedor.notas;

        document.getElementById('proveedorForm').dataset.editingId = proveedor.id;
    }
}

export function mostrarProveedores() {
    console.log('Lista de proveedores:', proveedores);
    const main = document.querySelector('main');
    const listaContainer = document.createElement('div');
    listaContainer.innerHTML = '<h2>Lista de Proveedores</h2>';

    const lista = document.createElement('ul');
    proveedores.forEach(proveedor => {
        const item = document.createElement('li');
        item.textContent = `${proveedor.empresaProveedora} - ${proveedor.nombreVendedor}`;
        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.onclick = () => editarProveedor(proveedor.id);
        item.appendChild(editarBtn);
        lista.appendChild(item);
    });

    listaContainer.appendChild(lista);
    main.appendChild(listaContainer);
}
