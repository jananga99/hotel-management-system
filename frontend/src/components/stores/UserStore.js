import { makeObservable, observable, action } from 'mobx';


class UserStore{
    loading = false;
    isLoggedIn=false;
    first_name='';
    email='';

    constructor(){

        makeObservable(this, {
            loading: observable,
            isLoggedIn: observable,
            first_name:observable,
            email: observable,
            modifyObservable: action,
        });
    }

    modifyObservable(loading=false, isLoggedIn=false, first_name='', email='') {
        this.loading = loading;
        this.isLoggedIn = isLoggedIn;
        this.first_name = first_name;
        this.email = email;
    }
}

export default new UserStore();