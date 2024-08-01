export class CrearInput {
    constructor(className, texto, type, placeholder){
        this.className= className;
        this.texto= texto;
        this.type= type;
        this.placeholder= placeholder;
        this.element= this.agregarInput();
    }

    agregarInput = ()=>{
        const seccion = document.createElement("section");
        seccion.className=`contenedor-${this.className}`
            const label = document.createElement("label")
                const span = document.createElement("span")
                span.textContent=`${this.texto}`;
            label.appendChild(span);
            
            const input = document.createElement("input");
                input.type= `${this.type}`;
                if(this.placeholder){
                    input.placeholder=`${this.placeholder}`
                }
        seccion.append(label, input);
        return seccion
    }/*fin agregarInput */

    getElement(){
        return this.element
    }
}/*fin CrearInput*/

export class CrearTextArea{
    constructor(className, texto, placeholder){
        this.className= className;
        this.texto= texto;
        this.placeholder= placeholder;
        this.element= this.agregarTextArea();
    }

    agregarTextArea= ()=>{
        const seccion = document.createElement("section");
        seccion.className=`contenedor-${this.className}`
            const label = document.createElement("label")
                const span = document.createElement("span")
                span.textContent=`${this.texto}`;
            label.appendChild(span);
            
            const textarea = document.createElement("textarea");
            textarea.rows=20;
                
                if(this.placeholder){
                    textarea.placeholder=`${this.placeholder}`
                }
        seccion.append(label, textarea);
        return seccion
    }/*fin agregarTextArea */

    getElement(){
        return this.element
    }
}/*fin CrearTextArea */


