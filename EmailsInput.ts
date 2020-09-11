export interface Options{
  delimiter:string,
  headerLabel:string,
  placeHolderText:string,
}
export class EmailsInput{
  private el:HTMLElement;
  private options:Options;
  private input:HTMLInputElement; 
  private body:HTMLElement 
  private addresses:Array<string>=[];
  constructor(_el:HTMLElement,_options:Options){
    this.el=_el;
    this.el.className="emails-input";
    this.options=_options;
    console.log("creating a new EmailsInput");
    this.setupFormField()
    
    this.handleEvents();
  }
  private setupFormField(){
    const top:HTMLElement = document.createElement("div"); 
    top.className='emails-input__top';
    top.append(this.createHeader())
    this.createBody();
    top.append(this.body)    
    this.el.append(top)
    this.el.append(this.createActionBar())
  } 
  private createHeader(): HTMLElement{
    const header:HTMLElement = document.createElement("div"); 
    header.innerHTML=this.options.headerLabel;
    header.className='emails-input__header';
    return header; 
  }
  private createBody(){
    this.body = document.createElement("div"); 
    this.body.className='emails-input__body';    
    this.input = document.createElement("input");
    this.input.type="text";
    this.input.placeholder=this.options.placeHolderText;
    this.body.append(this.input)
  }
  private createActionBar(): HTMLElement{
    const footer = document.createElement("div"); 
    footer.className='emails-input__bottom';    
    const randomEmailGen = document.createElement("button");
    randomEmailGen.innerHTML="Add email";
    randomEmailGen.addEventListener('click',()=>{
      this.addNewAddress("test");
    })
    footer.append(randomEmailGen);

    const counter = document.createElement("button");
    counter.addEventListener('click',()=>{
      alert(this.addresses.length);
    })    
    counter.innerHTML="Get emails count";
    footer.append(counter);    
    return footer
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
    const isValidEmail = this.isValidEmail(value);
    if(!isValidEmail)
      addressSpan.className="invalid";
    const del:HTMLElement = document.createElement("i");
    del.innerHTML=" X"
    del.addEventListener('click',()=>{
      const addressIndex = this.addresses.indexOf(value);
      this.addresses.splice(addressIndex,1);
      addressSpan.remove();
      console.log(this.addresses);
    })
    addressSpan.append(del);
    this.body.insertBefore(addressSpan,this.input);
    this.addresses.push(value);
    console.log(this.addresses);
  }
  private isValidEmail(value:string):boolean{
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value.toLowerCase());  
  }
    
}