import { extendObservable } from 'mobx';


class UserStore{
    constructor(){
        extendObservable(this, {
            loading: false,
            isLoggedIn: false,
            first_name:'',
            email: ''
        });
    }
}

export default new UserStore();