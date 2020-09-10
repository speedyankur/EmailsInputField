export interface Options{
  delimiter:string,
  placeHolderText:string,
}
export class EmailsInput{
  private el:HTMLElement;
  private options:Options;
  private input:HTMLInputElement;  
  private addresses:Array<string>=[];
  constructor(_el:HTMLElement,_options:Options){
    this.el=_el;
    this.options=_options;
    console.log("creating a new EmailsInput");
    this.input = this.createInput();
    this.handleEvents();
    this.el.append(this.input)
  }
  private createInput(): HTMLInputElement{
    const input:HTMLInputElement = document.createElement("input");
    input.type="text";
    input.placeholder=this.options.placeHolderText;
    return input;
  }
  private handleEvents(){
    this.input.addEventListener('blur',(e)=>{
      this.addNewAddress(this.input.value)
      this.input.value="";
    });    
    this.input.addEventListener('keyup',(e)=>{
      console.log(e.keyCode);  
      switch(e.keyCode){
        case 13:
          this.addNewAddress(this.input.value)
          this.input.value="";
          break;
        case 188:  
          this.addNewAddress(this.input.value.substring(0,this.input.value.length-1))
          this.input.value="";
          break;
      }
    });
    this.input.addEventListener('paste',(e)=>{
      e.preventDefault();
      const paste:string = (e.clipboardData || window.clipboardData).getData('text');
      const addresses = paste.split(this.options.delimiter);
      addresses.forEach(address=> this.addNewAddress(address));
    });
  }
  private addNewAddress(value:string){
    if(value==="")
      return;
    const addressSpan:HTMLElement = document.createElement("span");
    addressSpan.innerHTML=value;
    const del:HTMLElement = document.createElement("i");
    del.innerHTML=" X"
    del.addEventListener('click',()=>{
      const addressIndex = this.addresses.indexOf(value);
      this.addresses.splice(addressIndex,1);
      addressSpan.remove();
      console.log(this.addresses);
    })
    addressSpan.append(del);
    this.el.insertBefore(addressSpan,this.input);
    this.addresses.push(value);
    console.log(this.addresses);
  }
}