import { makeObservable, observable, action, extendObservable } from 'mobx';


class UserStore{
    loading = true;
    isLoggedIn=false;
    first_name='';
    email='';
    type=20;

    constructor(){
        makeObservable(this, {
            loading: observable,
            isLoggedIn: observable,
            first_name:observable,
            email: observable,
            type: observable,
            modifyObservable: action,
        });
    }

    modifyObservable(loading=false, isLoggedIn=false, first_name='', email='', type=-1) {
        this.loading = loading;
        this.isLoggedIn = isLoggedIn;
        this.first_name = first_name;
        this.email = email;
        this.type = type;
    }
}

export default new UserStore();