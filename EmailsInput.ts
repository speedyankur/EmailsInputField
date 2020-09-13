export interface Options {
  delimiter?: string;
  headerLabel?: string;
  placeHolderText?: string;
  addEmailsLabel?: string;
  countEmailsLabel?: string;
}
interface Address {
  id: number;
  isValidEmail: boolean;
  value: string;
}
class AddressBook {
  private counter = 0;
  private addresses: Array<Address> = [];
  public add(value: string): Address {
    const isValidEmail = this.isValidEmail(value);
    const address: Address = {
      id: this.counter,
      value,
      isValidEmail
    };
    this.addresses.push(address);
    this.counter++;
    return address;
  }
  public remove(id: number): Address {
    const index = this.addresses.findIndex(add => add.id === id);
    if (index > -1) {
      return this.addresses.splice(index, 1)[0];
    } else {
      return null;
    }
  }
  public getCountOfValidEmails(): number {
    return this.addresses.filter(address => address.isValidEmail).length;
  }
  private isValidEmail(value: string): boolean {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value.toLowerCase());
  }
}
export class EmailsInput {
  private el: HTMLElement;
  private options: Options;
  private input: HTMLInputElement;
  private body: HTMLElement;
  private addressesBook: AddressBook = new AddressBook();
  private defaultOptions: Options = {
    delimiter: ",",
    headerLabel: "Share Board name with others",
    placeHolderText: "add emails..",
    addEmailsLabel: "Add email",
    countEmailsLabel: "Get emails count"
  };
  constructor(_el: HTMLElement, _options?: Options) {
    this.el = _el;
    this.el.className = "emails-input";
    this.options = { ...this.defaultOptions, ..._options };
    this.setupFormField();
    this.handleEvents();
  }
  private setupFormField() {
    const top: HTMLElement = document.createElement("div");
    top.className = "emails-input__top";
    top.append(this.createHeader());
    this.createBody();
    top.append(this.body);
    this.el.append(top);
    this.el.append(this.createActionBar());
  }
  private createHeader(): HTMLElement {
    const header: HTMLElement = document.createElement("div");
    header.innerHTML = this.options.headerLabel;
    header.className = "emails-input__header";
    return header;
  }
  private createBody() {
    this.body = document.createElement("div");
    this.body.className = "emails-input__body";
    this.input = document.createElement("input");
    this.input.type = "email";
    this.input.placeholder = this.options.placeHolderText;
    this.body.append(this.input);
  }
  private createActionBar(): HTMLElement {
    const footer = document.createElement("div");
    footer.className = "emails-input__bottom";
    const randomEmailGen = document.createElement("button");
    randomEmailGen.innerHTML = this.options.addEmailsLabel;
    randomEmailGen.addEventListener("click", () => {
      const chars = "abcdefghijklmnopqrstuvwxyz";
      const randomEmail =
        chars[Math.floor(Math.random() * 26)] +
        Math.random()
          .toString(36)
          .substring(2, 11) +
        "@random.com";
      this.addNewAddress(randomEmail);
    });
    footer.append(randomEmailGen);

    const counter = document.createElement("button");
    counter.addEventListener("click", () => {
      alert(this.addressesBook.getCountOfValidEmails());
    });
    counter.innerHTML = this.options.countEmailsLabel;
    footer.append(counter);
    return footer;
  }
  private handleEvents() {
    this.body.addEventListener("click", e => {
      this.input.focus();
    });
    this.input.addEventListener("blur", e => {
      this.addNewAddress(this.input.value);
      this.input.value = "";
    });
    this.input.addEventListener("keyup", e => {
      switch (e.key) {
        case "Enter":
          this.addNewAddress(this.input.value);
          this.input.value = "";
          break;
        case this.options.delimiter:
          this.addNewAddress(
            this.input.value.substring(0, this.input.value.length - 1)
          );
          this.input.value = "";
          break;
      }
    });
    this.input.addEventListener("paste", e => {
      e.preventDefault();
      const paste: string = (e.clipboardData || window.clipboardData).getData(
        "text"
      );
      const addresses = paste.split(this.options.delimiter);
      addresses.forEach(address => this.addNewAddress(address));
    });
  }
  private addNewAddress(value: string) {
    if (value === "") return;
    const addObj = this.addressesBook.add(value);
    const addressSpan: HTMLElement = document.createElement("span");
    addressSpan.innerHTML = value;
    addressSpan.attributes["data-id"] = addObj.id;
    if (!addObj.isValidEmail) addressSpan.className = "invalid";
    const del: HTMLElement = document.createElement("i");
    del.className = "icon";
    del.attributes["data-id"] = addObj.id;
    del.addEventListener("click", e => {
      e.stopPropagation();
      const delEl = <HTMLElement>e.target;
      const deletedAddress = this.addressesBook.remove(
        delEl.attributes["data-id"]
      );
      if (deletedAddress) {
        addressSpan.remove();
      }
    });
    addressSpan.append(del);
    this.body.insertBefore(addressSpan, this.input);
  }
}
